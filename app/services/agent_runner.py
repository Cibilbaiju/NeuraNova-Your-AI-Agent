from langchain_community.llms import Ollama

def run_llm_agent(prompt: str) -> str:
    llm = Ollama(model="llama3")
    return llm(prompt)


