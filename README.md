# 🧠 NeuraNova – Advanced Local LLM AI Agent

NeuraNova is a powerful, privacy-first full-stack AI agent platform that runs entirely on your device. It combines natural language understanding, speech processing, and file intelligence through a sleek, modern interface powered by Ollama’s local LLMs.

---

## ✨ Features

- 🧠 **Conversational AI** – Talk to NeuraNova using natural language.
- 🔊 **Voice Input + Output** – Upload audio and get audio replies.
- 📎 **File Uploads** – Extract text from PDFs and images.
- 💬 **Stylish Dark UI** – Animated, modern black-glass interface.
- 🔐 **100% Local & Private** – Runs on your machine. No cloud.

---

## 📁 Project Structure

llm-agent-platform/
├── backend/
│ ├── app/
│ │ ├── main.py
│ │ ├── routes/
│ │ │ ├── chat.py
│ │ │ ├── file.py
│ │ │ └── voice.py
│ │ └── services/
│ │ └── agent_runner.py
│ └── requirements.txt
├── frontend/
│ ├── app/
│ │ └── page.tsx
│ ├── styles/
│ │ └── globals.css
│ ├── tailwind.config.js
│ └── package.json
└── run_all.sh



---

## 🚀 Getting Started

### ✅ Prerequisites

- **Node.js** v18+
- **Python** 3.10+
- [**Ollama**](https://ollama.com) installed (`ollama run llama3`)
- Whisper, gTTS, and Tesseract (installed via `requirements.txt`)

