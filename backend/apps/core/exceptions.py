import logging
from rest_framework.views import exception_handler
from rest_framework.exceptions import APIException, ValidationError, AuthenticationFailed, NotAuthenticated, PermissionDenied, NotFound
from rest_framework import status
from apps.core.responses import APIResponse

logger = logging.getLogger('apps')

def custom_exception_handler(exc, context):
    """
    Global exception handler ensuring all API errors return standardized JSON responses:
    {
        "success": false,
        "message": "...",
        "errors": {...},
        "code": "..."
    }
    """
    # Call DRF's default exception handler first to get the standard response object
    response = exception_handler(exc, context)
    view_name = context['view'].__class__.__name__ if 'view' in context else 'UnknownView'
    request_path = context['request'].path if 'request' in context else 'UnknownPath'

    if response is not None:
        message = "An error occurred while processing your request."
        code = "API_ERROR"
        errors = response.data

        if isinstance(exc, ValidationError):
            message = "Validation failed for provided fields."
            code = "VALIDATION_ERROR"
        elif isinstance(exc, (NotAuthenticated, AuthenticationFailed)):
            message = "Authentication credentials were not provided or are invalid."
            code = "UNAUTHENTICATED"
        elif isinstance(exc, PermissionDenied):
            message = "You do not have permission to perform this action."
            code = "PERMISSION_DENIED"
        elif isinstance(exc, NotFound):
            message = "The requested resource was not found."
            code = "NOT_FOUND"
        elif isinstance(exc, APIException):
            message = str(exc.detail) if hasattr(exc, 'detail') else str(exc)

        logger.warning(f"Handled API Exception [{code}] in {view_name} ({request_path}): {message}")

        return APIResponse.error(
            message=message,
            errors=errors,
            status_code=response.status_code,
            code=code
        )

    # Handle unhandled Python exceptions (500 Internal Server Error)
    logger.error(f"Unhandled Exception in {view_name} ({request_path}): {str(exc)}", exc_info=True)
    return APIResponse.error(
        message="A severe server error occurred. Please contact system administrator.",
        errors={"detail": str(exc)},
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        code="INTERNAL_SERVER_ERROR"
    )
