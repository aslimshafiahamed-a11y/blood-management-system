from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from apps.accounts.views import (
    LoginView,
    RegisterView,
    PasswordResetRequestView,
    PasswordResetConfirmView,
    UserProfileView,
    UserListView,
)

urlpatterns = [
    path('login/', LoginView.as_view(), name='auth-login'),
    path('register/', RegisterView.as_view(), name='auth-register'),
    path('refresh/', TokenRefreshView.as_view(), name='auth-refresh'),
    path('password-reset/', PasswordResetRequestView.as_view(), name='auth-password-reset-request'),
    path('password-reset-confirm/', PasswordResetConfirmView.as_view(), name='auth-password-reset-confirm'),
    path('profile/', UserProfileView.as_view(), name='auth-profile'),
    path('users/', UserListView.as_view(), name='user-list'),
]
