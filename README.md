# Explain It Like I'm 5 🧠

A fun, educational web app that breaks down complex topics into 3 levels of explanation: Kid, Teen, and Adult — using Gemini AI ✨

## Features
- 🤖 AI-generated explanations
- 🧒 Age-specific breakdowns
- 🎉 Surprise topics + fun facts
- 🧠 Tooltips with smart word definitions

## Stack
- FastAPI (backend)
- React + Tailwind (frontend)
- Gemini API (via google-generativeai)
- Google Cloud Run (deployment)

## Local Setup

1. Clone the repo
2. Create `.env` file from `.env.example`
3. Run backend:

```bash
uvicorn backend.main:app --reload
cd frontend
npm install
npm run dev
```

## Deploy to Cloud Run

```bash
gcloud builds submit --tag gcr.io/YOUR_PROJECT/explain-it
gcloud run deploy explain-it \
  --image gcr.io/YOUR_PROJECT/explain-it \
  --platform managed \
  --region europe-west1 \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY=your-key-here
```

## Live Demo

Coming soon at: https://explain-it-xxxxx-ew.a.run.app/
