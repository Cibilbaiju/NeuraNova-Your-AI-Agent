from fastapi import APIRouter, UploadFile, File, Form, Response
from services.voice_tools import transcribe_audio, speak_text

router = APIRouter()

@router.post("/voice")
async def voice(file: UploadFile = File(...)):
    text = transcribe_audio(file)
    return {"text": text}

@router.post("/speak")
async def speak(text: str = Form(...)):
    audio_data = speak_text(text)
    return Response(content=audio_data, media_type="audio/mpeg")


