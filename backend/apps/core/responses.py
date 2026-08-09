from rest_framework.response import Response
from rest_framework import status

class APIResponse:
    """Enterprise standard API response wrapper"""
    
    @staticmethod
    def success(data=None, message="Operation completed successfully", status_code=status.HTTP_200_OK, meta=None):
        payload = {
            "success": True,
            "message": message,
            "data": data if data is not None else {}
        }
        if meta:
            payload["meta"] = meta
        return Response(payload, status=status_code)

    @staticmethod
    def error(message="An error occurred", errors=None, status_code=status.HTTP_400_BAD_REQUEST, code="BAD_REQUEST"):
        payload = {
            "success": False,
            "message": message,
            "errors": errors if errors is not None else {},
            "code": code
        }
        return Response(payload, status=status_code)
