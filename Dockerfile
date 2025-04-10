# Step 1: Build React frontend
FROM node:20 AS frontend-build
WORKDIR /app
COPY frontend/ ./frontend/
WORKDIR /app/frontend
RUN npm install && npm run build

# Step 2: Backend with FastAPI
FROM python:3.11-slim
WORKDIR /app
COPY backend/ ./backend/
COPY requirements.txt .
COPY --from=frontend-build /app/frontend/dist ./frontend/dist
COPY .env .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8080
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8080"]
