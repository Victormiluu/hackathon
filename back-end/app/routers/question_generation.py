from fastapi import APIRouter, UploadFile, File, HTTPException
import pdfplumber
import io
import os
from dotenv import load_dotenv
from langchain_community.chat_models import AzureChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser

load_dotenv()

AZURE_OPENAI_ENDPOINT = os.getenv("AZURE_OPENAI_ENDPOINT")
AZURE_OPENAI_KEY = os.getenv("AZURE_OPENAI_KEY")
AZURE_DEPLOYMENT_NAME = os.getenv("AZURE_OPENAI_DEPLOYMENT_NAME")
AZURE_OPENAI_API_VERSION = "2023-05-15"

router = APIRouter(
    prefix="/question-generation",
    tags=["question-generation"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)

@router.post("/")
async def post(pdf: UploadFile = File(...)):
    if pdf.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="File must be a PDF")
    try:
        contents = await pdf.read()
        with pdfplumber.open(io.BytesIO(contents)) as pdf_file:
            text = ""
            for page in pdf_file.pages:
                text += page.extract_text() or ""
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"PDF extraction failed: {str(e)}")

    try:
        llm = AzureChatOpenAI(
            azure_endpoint=AZURE_OPENAI_ENDPOINT,
            openai_api_version=AZURE_OPENAI_API_VERSION,
            deployment_name=AZURE_DEPLOYMENT_NAME,
            openai_api_key=AZURE_OPENAI_KEY,
            openai_api_type="azure",
            temperature=0.7,
            max_tokens=500,
        )
        parser = JsonOutputParser()
        prompt = ChatPromptTemplate.from_messages([
            ("system", "You are a helpful assistant that generates multiple choice quiz questions."),
            (
                "human",
                "Generate 3 multiple choice quiz questions based on the following text. "
                "For each question, provide 3 options labeled 'a', 'b', and 'c'. "
                "Return ONLY a JSON array of objects, each with 'question', 'theme' (the central theme of the question), 'options' (an object with keys 'a', 'b', 'c' and their respective string values), and 'answer' (the correct option key as a string, e.g., 'a'). "
                "Example: [{{\"question\": \"What is ...?\", \"options\": {{\"a\": \"Option 1\", \"b\": \"Option 2\", \"c\": \"Option 3\"}}, \"correct_answer\": \"a\"}}, ...]\n\n{text}"
            )
        ])
        chain = prompt | llm | parser
        # Get both result and metadata
        result = chain.invoke({"text": text[:20000]}, return_intermediate_steps=True)
        questions = result["output"]
        # Log token usage if available
        if "llm_output" in result and "token_usage" in result["llm_output"]:
            token_usage = result["llm_output"]["token_usage"]
            print(f"Prompt tokens: {token_usage.get('prompt_tokens')}, "
                  f"Completion tokens: {token_usage.get('completion_tokens')}, "
                  f"Total tokens: {token_usage.get('total_tokens')}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Azure OpenAI API error: {str(e)}")

    return {"questions": questions}
