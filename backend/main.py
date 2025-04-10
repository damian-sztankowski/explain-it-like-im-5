from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import os
from dotenv import load_dotenv
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

# Serve React build
app.mount("/static", StaticFiles(directory="frontend/dist/assets"), name="static")

@app.get("/")
def serve_frontend():
    return FileResponse("frontend/dist/index.html")


load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class RequestBody(BaseModel):
    topic: str

@app.post("/explain")
async def explain_topic(body: RequestBody):
    prompt = f"""
You are a brilliant educator skilled at adapting complex topics to different age groups.

Your task is to explain the topic: '{body.topic}' in three separate levels of understanding:

1. **Kid Level (ages 3–5)**  
Use a short story, metaphor, or playful comparison. Use simple language, short sentences, and concrete examples. Make it sound like you’re talking to a curious child.

2. **Teen Level (ages 11–17)**  
Use casual but informative language. Include real-life analogies, fun comparisons, and more detail. Speak like a cool high school teacher who makes things engaging and clear.

3. **Adult Level**  
Give a clear, accurate explanation as if you're talking to an intelligent but non-expert adult. Use precise language, but no jargon. Focus on clarity, usefulness, and understanding.

Each section should be under 200 words. Format them clearly using markdown:  
**1. Kid Level**  
...  
**2. Teen Level**  
...  
**3. Adult Level**  
...

"""
    try:
        model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest")
        response = model.generate_content(prompt)
        return {"result": response.text}
    except Exception as e:
        return {"error": str(e)}
models = genai.list_models()
for m in models:
    print(m.name)
