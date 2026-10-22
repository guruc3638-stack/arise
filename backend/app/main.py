import uuid
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from starlette.exceptions import HTTPException as StarletteHTTPException
from fastapi.exceptions import RequestValidationError

from app.core.config import settings
from app.core.errors import (
    AppError,
    app_error_handler,
    http_exception_handler,
    validation_exception_handler,
    generic_exception_handler,
)
from app.routers import health

app = FastAPI(
    title="ARISE API",
    version="1.0.0",
    description="Backend API for ARISE (Learn · Practice · Compete) — EdTech & Verified DSA Platform",
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/api/v1/openapi.json",
)

# CORS Middleware (Restricted to configured origins per doc 03)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS if isinstance(settings.CORS_ORIGINS, list) else ["*"],
    allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1|0\.0\.0\.0|192\.168\.[0-9]+\.[0-9]+)(:[0-9]+)?$|^https://.*\.vercel\.app$|^null$",
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["X-Request-ID", "X-Content-Type-Options", "X-Frame-Options"],
)


# Security and Request ID Middleware
@app.middleware("http")
async def security_and_request_id_middleware(request: Request, call_next):
    request_id = request.headers.get("X-Request-ID") or str(uuid.uuid4())
    request.state.request_id = request_id
    response = await call_next(request)
    response.headers["X-Request-ID"] = request_id
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    return response


# Standardized Error Handlers (Rule 10: {code, message, request_id}, no stack traces/secrets)
app.add_exception_handler(AppError, app_error_handler)
app.add_exception_handler(StarletteHTTPException, http_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
app.add_exception_handler(Exception, generic_exception_handler)

from app.routers import health, profile, dsa, submissions, leaderboards, friends, learning, self_study, badges

# Routers
# Mount root health check /health and versioned /api/v1/health
app.include_router(health.router)
app.include_router(health.router, prefix=settings.API_V1_STR)
app.include_router(profile.router, prefix=settings.API_V1_STR)
app.include_router(dsa.router, prefix=settings.API_V1_STR)
app.include_router(submissions.router, prefix=settings.API_V1_STR)
app.include_router(leaderboards.router, prefix=settings.API_V1_STR)
app.include_router(friends.router, prefix=settings.API_V1_STR)
app.include_router(learning.router, prefix=settings.API_V1_STR)
app.include_router(self_study.router, prefix=settings.API_V1_STR)
app.include_router(badges.router, prefix=settings.API_V1_STR)


@app.on_event("startup")
async def startup_seed_event():
    """Initializes platform seed data (demo credentials, #1 leaderboard student, 6 PDFs, cohort)."""
    try:
        from app.data.platform_seed import seed_platform_data
        await seed_platform_data()
    except Exception as e:
        print(f"[PlatformSeed] Warning on startup seed: {e}")


@app.get("/", tags=["Root"])
async def root_info():
    """Service metadata endpoint."""
    return {
        "app": settings.APP_NAME,
        "tagline": "Learn. Solve. Rise.",
        "version": "1.0.0",
        "docs": "/docs",
        "api_v1": settings.API_V1_STR,
    }
