from rest_framework import status, generics
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from drf_spectacular.utils import extend_schema, OpenApiResponse

from apps.core.responses import APIResponse
from apps.accounts.models import User
from apps.accounts.permissions import IsAdmin, IsStaffUser
from apps.accounts.serializers import (
    UserSerializer,
    CustomTokenObtainPairSerializer,
    RegisterSerializer,
    PasswordResetRequestSerializer,
    PasswordResetConfirmSerializer,
    UserProfileUpdateSerializer,
)

class LoginView(TokenObtainPairView):
    """
    User Login API
    Authenticates user using email and password, returning access and refresh JWT tokens along with user details.
    """
    serializer_class = CustomTokenObtainPairSerializer

    @extend_schema(
        summary="User Login",
        description="Authenticate user with email and password to receive JWT tokens.",
        responses={200: OpenApiResponse(description="JWT token pair and user object returned.")}
    )
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        return APIResponse.success(
            data=data,
            message="User authenticated successfully",
            status_code=status.HTTP_200_OK
        )

class RegisterView(generics.CreateAPIView):
    """
    User Registration API
    Registers a new user (Donor, Hospital Staff, or Blood Bank Staff) and returns JWT tokens upon success.
    """
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    @extend_schema(
        summary="User Registration",
        description="Create a new user account with role selection and receive JWT tokens.",
        responses={201: OpenApiResponse(description="User created and JWT tokens returned.")}
    )
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Generate JWT tokens immediately on registration
        refresh = RefreshToken.for_user(user)
        refresh['email'] = user.email
        refresh['full_name'] = user.full_name
        refresh['role'] = user.role

        response_data = {
            'user': UserSerializer(user).data,
            'access': str(refresh.access_token),
            'refresh': str(refresh),
        }

        return APIResponse.success(
            data=response_data,
            message="User account created successfully",
            status_code=status.HTTP_201_CREATED
        )

class PasswordResetRequestView(APIView):
    """
    Password Reset Request API
    Initiates password reset process for given email address.
    """
    permission_classes = [AllowAny]
    serializer_class = PasswordResetRequestSerializer

    @extend_schema(
        summary="Request Password Reset",
        description="Submit user email to generate password reset verification code.",
        request=PasswordResetRequestSerializer,
    )
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']

        # In production this dispatches reset email. Demo verification code returned for testing.
        return APIResponse.success(
            data={'email': email, 'demo_reset_code': '884920'},
            message="Password reset code generated and sent to email.",
            status_code=status.HTTP_200_OK
        )

class PasswordResetConfirmView(APIView):
    """
    Password Reset Confirmation API
    Sets new password using reset code.
    """
    permission_classes = [AllowAny]
    serializer_class = PasswordResetConfirmSerializer

    @extend_schema(
        summary="Confirm Password Reset",
        description="Set new user password using valid reset verification code.",
        request=PasswordResetConfirmSerializer,
    )
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        new_password = serializer.validated_data['new_password']

        try:
            user = User.objects.get(email__iexact=email)
            user.set_password(new_password)
            user.save()
            return APIResponse.success(
                message="Password updated successfully. You may now login.",
                status_code=status.HTTP_200_OK
            )
        except User.DoesNotExist:
            return APIResponse.error(
                message="User not found",
                status_code=status.HTTP_404_NOT_FOUND,
                code="USER_NOT_FOUND"
            )

class UserProfileView(APIView):
    """
    User Profile API
    Retrieve or update currently authenticated user's profile details.
    """
    permission_classes = [IsAuthenticated]

    @extend_schema(
        summary="Get Profile",
        description="Retrieve profile details of currently logged-in user.",
        responses={200: UserSerializer}
    )
    def get(self, request):
        serializer = UserSerializer(request.user)
        return APIResponse.success(
            data=serializer.data,
            message="Profile retrieved successfully"
        )

    @extend_schema(
        summary="Update Profile",
        description="Update profile details of currently logged-in user.",
        request=UserProfileUpdateSerializer,
        responses={200: UserSerializer}
    )
    def put(self, request):
        serializer = UserProfileUpdateSerializer(request.user, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        updated_user = UserSerializer(request.user).data
        return APIResponse.success(
            data=updated_user,
            message="Profile updated successfully"
        )

class UserListView(generics.ListAPIView):
    """
    User Directory API
    List system users (accessible by Admin & Staff roles for auditing/directory).
    """
    permission_classes = [IsStaffUser]
    serializer_class = UserSerializer

    @extend_schema(
        summary="List System Users",
        description="Retrieve system users list filtered optionally by role.",
    )
    def get_queryset(self):
        queryset = User.objects.all()
        role = self.request.query_params.get('role', None)
        if role:
            queryset = queryset.filter(role=role)
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return APIResponse.success(
            data=serializer.data,
            message="Users retrieved successfully"
        )
