from fastapi import APIRouter, Request
from pydantic import BaseModel
from services.agent_runner import run_llm_agent

router = APIRouter()

class Message(BaseModel):
    message: str

@router.post("/chat")
async def chat(message: Message):
    response = run_llm_agent(message.message)
    return {"response": response}
