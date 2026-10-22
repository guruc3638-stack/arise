import os
import httpx
from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI(
    title="ARISE API Gateway",
    description="Public Gateway Service for ARISE — Routes public traffic to the internal backend service via Vercel service bindings.",
    version="1.0.0"
)

# Enable CORS for web frontend clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Vercel service binding: BACKEND_URL is injected by Vercel from the internal "backend" service
# Falls back to local uvicorn host for local development with vercel dev
BACKEND_URL = os.environ.get("BACKEND_URL", "http://localhost:8000").rstrip("/")

HOP_BY_HOP_HEADERS = {
    "host",
    "content-length",
    "connection",
    "keep-alive",
    "proxy-authenticate",
    "proxy-authorization",
    "te",
    "trailers",
    "transfer-encoding",
    "upgrade"
}


@app.get("/health", tags=["Gateway Health"])
@app.get("/api/health", tags=["Gateway Health"])
async def gateway_health():
    """Health check verifying the gateway service and internal backend service connectivity."""
    backend_status = "unknown"
    try:
        async with httpx.AsyncClient(timeout=3.0) as client:
            resp = await client.get(f"{BACKEND_URL}/health")
            backend_status = "healthy" if resp.status_code == 200 else f"status_{resp.status_code}"
    except Exception as exc:
        backend_status = f"unreachable ({exc})"

    return {
        "service": "api",
        "status": "online",
        "bound_backend_url": BACKEND_URL,
        "internal_backend_status": backend_status
    }


@app.api_route("/{path:path}", methods=["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"])
async def proxy_to_backend(request: Request, path: str):
    """
    Reverse proxies incoming API traffic to the internal backend service.
    Uses the BACKEND_URL service binding injected by Vercel.
    """
    raw_path = "/" + path.lstrip("/")

    # Ensure /api prefix is present when calling backend routers mounted under /api/v1
    if not raw_path.startswith("/api") and not raw_path.startswith("/docs") and not raw_path.startswith("/redoc") and not raw_path.startswith("/openapi"):
        target_path = "/api" + raw_path
    else:
        target_path = raw_path

    target_url = f"{BACKEND_URL}{target_path}"

    # Filter out hop-by-hop headers
    forward_headers = {
        key: value for key, value in request.headers.items()
        if key.lower() not in HOP_BY_HOP_HEADERS
    }

    body = await request.body()
    query_params = dict(request.query_params)

    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            backend_response = await client.request(
                method=request.method,
                url=target_url,
                headers=forward_headers,
                params=query_params,
                content=body if body else None,
            )

        # Build response headers excluding hop-by-hop headers
        resp_headers = {
            k: v for k, v in backend_response.headers.items()
            if k.lower() not in HOP_BY_HOP_HEADERS and k.lower() != "content-encoding"
        }

        return Response(
            content=backend_response.content,
            status_code=backend_response.status_code,
            headers=resp_headers,
            media_type=backend_response.headers.get("content-type")
        )
    except httpx.RequestError as exc:
        return JSONResponse(
            status_code=502,
            content={
                "code": "BAD_GATEWAY",
                "message": f"Failed to forward request to internal backend service at '{BACKEND_URL}'",
                "detail": str(exc),
                "target_url": target_url
            }
        )
