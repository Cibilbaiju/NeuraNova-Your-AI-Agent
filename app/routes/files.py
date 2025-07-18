from fastapi import APIRouter, UploadFile, File
from services.file_parser import parse_file

router = APIRouter()

@router.post("/file")
async def file(file: UploadFile = File(...)):
    parsed = parse_file(file)
    return {"parsed_text": parsed}
