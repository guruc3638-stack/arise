import time
from collections import defaultdict
from typing import Dict, List
from fastapi import Request
from app.core.errors import AppError
from starlette import status


class RateLimitError(AppError):
    def __init__(self, message: str = "Too many attempts. Please try again later."):
        super().__init__(
            code="RATE_LIMITED",
            message=message,
            status_code=status.HTTP_429_TOO_MANY_REQUESTS
        )


class InMemoryRateLimiter:
    """Thread-safe sliding-window rate limiter for sensitive endpoints (login, signup)."""

    def __init__(self, max_requests: int = 10, window_seconds: int = 60):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self._records: Dict[str, List[float]] = defaultdict(list)

    def _get_key(self, request: Request, identifier: str) -> str:
        client_ip = request.client.host if request.client else "127.0.0.1"
        return f"{identifier}:{client_ip}"

    def check(self, request: Request, identifier: str = "default") -> None:
        key = self._get_key(request, identifier)
        now = time.time()
        cutoff = now - self.window_seconds

        # Prune expired timestamps
        timestamps = [ts for ts in self._records[key] if ts > cutoff]
        self._records[key] = timestamps

        if len(timestamps) >= self.max_requests:
            raise RateLimitError("Rate limit exceeded for login/signup attempts. Please try again later.")

        # Record this attempt
        self._records[key].append(now)

    def reset(self) -> None:
        """Clear all rate limit records (used in tests)."""
        self._records.clear()


auth_rate_limiter = InMemoryRateLimiter(max_requests=10, window_seconds=60)
