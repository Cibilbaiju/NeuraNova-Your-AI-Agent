from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.chat import router as chat_router
from routes.voice import router as voice_router
from routes.files import router as file_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "LLM Agent API is running"}

app.include_router(chat_router, prefix="/api")
app.include_router(voice_router, prefix="/api")
app.include_router(file_router, prefix="/api")