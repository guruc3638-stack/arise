import sys
import os

# Ensure backend directory is in python module search path
backend_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend"))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

try:
    from app.main import app
except Exception as exc:
    # Resilient fallback handler if serverless environment lacks complete DB/Supabase env vars
    from fastapi import FastAPI
    app = FastAPI(title="ARISE Serverless Gateway")

    @app.get("/api/v1/health")
    def health():
        return {
            "status": "degraded",
            "message": "ARISE serverless function initialized. Set DATABASE_URL and SUPABASE env vars in Vercel project settings.",
            "detail": str(exc)
        }
