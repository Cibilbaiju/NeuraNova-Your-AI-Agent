'use client'

import { useEffect, useRef, useState } from "react"
import { useCallback } from "react"
import axios from "axios"

const USER_AVATAR = "🧑‍💻";
const AGENT_AVATAR = "🤖";

export default function Page() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [input, setInput] = useState("")
  const [fileText, setFileText] = useState("")
  const [voiceText, setVoiceText] = useState("")
  const [audioUrl, setAudioUrl] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Dark mode toggle logic
  const [dark, setDark] = useState(true);
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  const toggleDark = useCallback(() => setDark(d => !d), []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { role: "user", content: input }])
    setIsTyping(true)
    try {
      const res = await axios.post("http://localhost:8000/api/chat", { message: input })
      const reply = res.data.response || "⚠️ No response from LLM"
      setMessages(prev => [...prev, { role: "agent", content: reply }])
    } catch {
      setMessages(prev => [...prev, { role: "agent", content: "⚠️ Failed to reach backend" }])
    }
    setIsTyping(false)
    setInput("")
  }

  const handleFileUpload = async (e: any) => {
    const formData = new FormData()
    formData.append("file", e.target.files[0])
    const res = await axios.post("http://localhost:8000/api/file", formData)
    setFileText(res.data.parsed_text || "No text extracted")
  }

  const handleVoice = async (e: any) => {
    const formData = new FormData()
    formData.append("file", e.target.files[0])
    const res = await axios.post("http://localhost:8000/api/voice", formData)
    setVoiceText(res.data.text || "Could not transcribe")
  }

  const handleSpeak = async () => {
    const formData = new FormData()
    formData.append("text", input)
    const res = await axios.post("http://localhost:8000/api/speak", formData, { responseType: "blob" })
    const url = URL.createObjectURL(res.data)
    setAudioUrl(url)
  }

  return (
    <div className="min-h-screen font-sans bg-primary text-white transition-colors duration-300">
      <header className="p-6 bg-gray-950 border-b border-gray-800 shadow-lg flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-bold text-accent tracking-wide glow-text flex items-center gap-3">
          🧠 LLM Agent Chat
        </h1>
        <button
          onClick={toggleDark}
          className="ml-4 px-4 py-2 rounded-lg bg-secondary text-accent font-semibold shadow hover:bg-gray-800 transition"
          title="Toggle dark/light mode"
        >
          {dark ? '🌙 Dark' : '☀️ Light'}
        </button>
      </header>

      <main className="container">
        <div className="border border-gray-800 rounded-xl bg-gradient-to-br from-gray-900 via-gray-950 to-black shadow-xl overflow-hidden">
          <div className="h-[400px] overflow-y-auto p-6 space-y-4 scroll-smooth bg-gray-900/80 backdrop-blur-md">
            {messages.length === 0 && <p className="text-gray-500 text-center">Start chatting with your agent...</p>}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] px-4 py-3 rounded-xl text-sm shadow-md ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-accent to-cyan-500 text-black rounded-br-none'
                    : 'bg-gray-800 text-white rounded-bl-none'
                }`}>
                  <span className="block text-xs opacity-60 mb-1">{msg.role === 'user' ? USER_AVATAR : AGENT_AVATAR}</span>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="text-sm text-accent animate-pulse">Agent is typing...</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-gray-800 bg-gray-900/90 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSend() }}
              placeholder="Type your question..."
              className="flex-1 p-3 rounded-lg bg-black border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              onClick={handleSend}
              className="px-5 py-2 bg-accent text-black font-bold rounded-lg hover:bg-cyan-400 transition"
              title="Send"
            >
              📤
            </button>
            <button
              onClick={handleSpeak}
              className="px-4 py-2 bg-gray-800 text-accent rounded-lg hover:bg-gray-700 transition"
              title="Speak"
            >
              🔊
            </button>
          </div>

          <div className="p-4 border-t border-gray-800 bg-gray-900/90 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-accent mb-1">📎 Upload PDF / Image</label>
              <input type="file" onChange={handleFileUpload} className="bg-black border border-gray-700 rounded p-2 w-full text-white" />
              {fileText && <p className="text-xs text-cyan-300 mt-2">Parsed: {fileText}</p>}
            </div>
            <div>
              <label className="block text-sm font-semibold text-accent mb-1">🎤 Upload Audio</label>
              <input type="file" onChange={handleVoice} className="bg-black border border-gray-700 rounded p-2 w-full text-white" />
              {voiceText && <p className="text-xs text-cyan-300 mt-2">Voice: {voiceText}</p>}
            </div>
          </div>

          {audioUrl && (
            <div className="p-4 border-t border-gray-800 bg-gray-900/90">
              <audio controls src={audioUrl} className="w-full" />
            </div>
          )}
        </div>
      </main>

      <footer className="text-center text-xs text-gray-500 py-4 border-t border-gray-800 bg-black/80">
        LLM Agent © {new Date().getFullYear()} – Black Neon UI by Cibil
      </footer>
    </div>
  )
}
