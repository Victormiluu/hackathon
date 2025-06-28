from fastapi import Depends, FastAPI

from .routers import learning_path
from .routers import question_generation

app = FastAPI()


app.include_router(question_generation.router)
app.include_router(learning_path.router)