from fastapi import APIRouter, UploadFile, File, HTTPException
import openai
import pdfplumber
import io

router = APIRouter(
    prefix="/learning-path",
    tags=["learning-path"],
    dependencies=[],
    responses={404: {"description": "Not found"}},
)


@router.get("/")
async def get():

    return {
        "activities": [
            {
                "id": "123",
                "questions": [
                    {
                        "id": "abc",
                        "description": "",
                        "options": [{"label": "xxxxxxxxxxxx", "value": "a"}],
                        "rightOption": "a",
                    }
                ],
            }
        ]
    }
