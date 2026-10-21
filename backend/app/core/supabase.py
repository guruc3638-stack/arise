import logging
from typing import Optional
from supabase import create_client, Client
from app.core.config import settings

logger = logging.getLogger(__name__)

_supabase_client: Optional[Client] = None


def get_supabase_client() -> Optional[Client]:
    """
    Initializes and returns the official Supabase Client using settings.
    Returns None if SUPABASE_URL or keys are using placeholder mock values.
    """
    global _supabase_client
    if _supabase_client is not None:
        return _supabase_client

    url = settings.SUPABASE_URL
    key = settings.SUPABASE_SERVICE_ROLE_KEY or settings.SUPABASE_ANON_KEY

    # Check for placeholder mock values
    if not url or "mock.supabase.co" in url or not key or "mock-" in key:
        logger.info("Supabase is currently running in local development mode with mock credentials.")
        return None

    try:
        _supabase_client = create_client(url, key)
        logger.info(f"Connected to Supabase project at: {url}")
        return _supabase_client
    except Exception as e:
        logger.error(f"Failed to initialize Supabase client: {str(e)}")
        return None


def test_supabase_connection() -> dict:
    """
    Tests live connection to Supabase and reports status.
    """
    url = settings.SUPABASE_URL
    is_mock = "mock.supabase.co" in url or "mock-" in (settings.SUPABASE_ANON_KEY or "")

    if is_mock:
        return {
            "connected": False,
            "status": "MOCK_MODE",
            "message": "Supabase credentials in backend/.env are currently placeholder mock values.",
            "url": url,
            "required_steps": [
                "1. Go to your Supabase project dashboard -> Settings -> API",
                "2. Copy Project URL and paste it into SUPABASE_URL in backend/.env",
                "3. Copy anon key into SUPABASE_ANON_KEY in backend/.env",
                "4. Copy service_role secret into SUPABASE_SERVICE_ROLE_KEY in backend/.env",
                "5. Copy JWT Secret into SUPABASE_JWT_SECRET in backend/.env",
                "6. Run schema migration in Supabase SQL Editor: backend/migrations/001_initial_schema.sql"
            ]
        }

    client = get_supabase_client()
    if not client:
        return {
            "connected": False,
            "status": "ERROR",
            "message": "Failed to initialize Supabase client with provided credentials.",
            "url": url
        }

    try:
        # Test basic query
        res = client.table("profiles").select("count", count="exact").limit(0).execute()
        return {
            "connected": True,
            "status": "CONNECTED",
            "message": "Successfully connected to live Supabase project!",
            "url": url,
            "tables_verified": True
        }
    except Exception as e:
        err_msg = str(e)
        if ("relation" in err_msg and "does not exist" in err_msg) or "PGRST205" in err_msg:
            return {
                "connected": True,
                "status": "CONNECTED_NO_TABLES",
                "message": "Connected to Supabase successfully! Schema tables have not been created yet.",
                "url": url,
                "action_needed": "Paste backend/migrations/001_initial_schema.sql in the Supabase SQL Editor and click Run."
            }
        return {
            "connected": False,
            "status": "CONNECTION_FAILED",
            "message": f"Connection error: {err_msg}",
            "url": url
        }
