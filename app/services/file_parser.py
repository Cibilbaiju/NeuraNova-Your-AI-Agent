import pytesseract
from PIL import Image
import fitz  # PyMuPDF
import io

def parse_file(file) -> str:
    if file.content_type == "application/pdf":
        pdf = fitz.open(stream=file.file.read(), filetype="pdf")
        text = " ".join(page.get_text() for page in pdf)  # type: ignore[attr-defined]
        return text.strip()
    elif file.content_type.startswith("image/"):
        image = Image.open(file.file)
        return pytesseract.image_to_string(image)
    else:
        return "Unsupported file type" 