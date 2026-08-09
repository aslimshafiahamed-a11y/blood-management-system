from rest_framework.permissions import BasePermission
from apps.accounts.models import UserRole

class IsAdmin(BasePermission):
    """Allows access only to System Administrator users."""
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            (request.user.role == UserRole.ADMIN or request.user.is_superuser)
        )

class IsBloodBankStaff(BasePermission):
    """Allows access to Blood Bank Staff and System Administrators."""
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            (request.user.role in [UserRole.BLOOD_BANK_STAFF, UserRole.ADMIN] or request.user.is_superuser)
        )

class IsHospitalStaff(BasePermission):
    """Allows access to Hospital Staff and System Administrators."""
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            (request.user.role in [UserRole.HOSPITAL_STAFF, UserRole.ADMIN] or request.user.is_superuser)
        )

class IsDonor(BasePermission):
    """Allows access to registered Donors."""
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role == UserRole.DONOR
        )

class IsStaffUser(BasePermission):
    """Allows access to any staff member (Admin, Blood Bank Staff, or Hospital Staff)."""
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            (request.user.role in [UserRole.ADMIN, UserRole.BLOOD_BANK_STAFF, UserRole.HOSPITAL_STAFF] or request.user.is_superuser)
        )
