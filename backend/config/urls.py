from django.contrib import admin
from django.urls import path, include
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
)

@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    """System health check endpoint"""
    return Response({
        'status': 'healthy',
        'service': 'Blood Management System API',
        'version': '1.0.0',
        'sprint': 'Sprint 1 Architecture'
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # System Health
    path('api/v1/health/', health_check, name='health-check'),
    
    # Authentication & User Management
    path('api/v1/auth/', include('apps.accounts.urls')),
    
    # OpenAPI / Swagger Documentation
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    path('api/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]
