import uuid
from typing import Optional
from fastapi import Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException


class AppError(Exception):
    """Base application exception with standardized code and status code."""

    def __init__(
        self,
        code: str,
        message: str,
        status_code: int = status.HTTP_400_BAD_REQUEST,
        request_id: Optional[str] = None
    ):
        self.code = code
        self.message = message
        self.status_code = status_code
        self.request_id = request_id or str(uuid.uuid4())
        super().__init__(message)


class AuthenticationError(AppError):
    def __init__(self, message: str = "Invalid or missing authentication credentials"):
        super().__init__(
            code="UNAUTHENTICATED",
            message=message,
            status_code=status.HTTP_401_UNAUTHORIZED
        )


class PermissionDeniedError(AppError):
    def __init__(self, message: str = "You do not have permission to access this resource"):
        super().__init__(
            code="FORBIDDEN",
            message=message,
            status_code=status.HTTP_403_FORBIDDEN
        )


class NotFoundError(AppError):
    def __init__(self, message: str = "The requested resource was not found"):
        super().__init__(
            code="NOT_FOUND",
            message=message,
            status_code=status.HTTP_404_NOT_FOUND
        )


class DuplicateResourceError(AppError):
    def __init__(self, message: str = "Resource conflict or duplicate entry"):
        super().__init__(
            code="CONFLICT",
            message=message,
            status_code=status.HTTP_409_CONFLICT
        )


class ValidationError(AppError):
    def __init__(self, message: str = "Request data validation failed"):
        super().__init__(
            code="VALIDATION_ERROR",
            message=message,
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY
        )


def get_request_id(request: Request) -> str:
    return getattr(request.state, "request_id", str(uuid.uuid4()))


async def app_error_handler(request: Request, exc: AppError) -> JSONResponse:
    request_id = exc.request_id or get_request_id(request)
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "code": exc.code,
            "message": exc.message,
            "request_id": request_id
        }
    )


async def http_exception_handler(request: Request, exc: StarletteHTTPException) -> JSONResponse:
    request_id = get_request_id(request)
    code_map = {
        400: "BAD_REQUEST",
        401: "UNAUTHENTICATED",
        403: "FORBIDDEN",
        404: "NOT_FOUND",
        405: "METHOD_NOT_ALLOWED",
        409: "CONFLICT",
        413: "FILE_TOO_LARGE",
        422: "VALIDATION_ERROR",
        429: "RATE_LIMITED",
        500: "INTERNAL_SERVER_ERROR"
    }
    code = code_map.get(exc.status_code, "ERROR")
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "code": code,
            "message": str(exc.detail),
            "request_id": request_id
        }
    )


async def validation_exception_handler(request: Request, exc: RequestValidationError) -> JSONResponse:
    request_id = get_request_id(request)
    errors = exc.errors()
    msg = errors[0]["msg"] if errors else "Invalid request data"
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "code": "VALIDATION_ERROR",
            "message": msg,
            "request_id": request_id
        }
    )


async def generic_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    # Rule 10: Never return stack traces or secrets to the client
    request_id = get_request_id(request)
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "code": "INTERNAL_SERVER_ERROR",
            "message": "An unexpected server error occurred. Please try again later.",
            "request_id": request_id
        }
    )
