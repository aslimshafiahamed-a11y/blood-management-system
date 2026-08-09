from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import get_user_model
from apps.accounts.models import UserRole, BloodGroup

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    """Serializer for user details"""
    full_name = serializers.CharField(read_only=True)
    role_display = serializers.CharField(source='get_role_display', read_only=True)
    blood_group_display = serializers.CharField(source='get_blood_group_display', read_only=True)

    class Meta:
        model = User
        fields = (
            'id',
            'email',
            'first_name',
            'last_name',
            'full_name',
            'phone_number',
            'role',
            'role_display',
            'blood_group',
            'blood_group_display',
            'organization_name',
            'is_verified',
            'avatar_url',
            'created_at',
            'updated_at'
        )
        read_only_fields = ('id', 'is_verified', 'created_at', 'updated_at')

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Custom JWT Token Obtain serializer that adds custom user claims and returns user info"""

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Custom claims embedded inside JWT token
        token['email'] = user.email
        token['full_name'] = user.full_name
        token['role'] = user.role
        token['is_verified'] = user.is_verified
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        # Standardize token response payload
        data['user'] = UserSerializer(self.user).data
        return data

class RegisterSerializer(serializers.ModelSerializer):
    """Serializer for user registration"""
    password = serializers.CharField(write_only=True, min_length=8, style={'input_type': 'password'})
    confirm_password = serializers.CharField(write_only=True, style={'input_type': 'password'})

    class Meta:
        model = User
        fields = (
            'email',
            'password',
            'confirm_password',
            'first_name',
            'last_name',
            'phone_number',
            'role',
            'blood_group',
            'organization_name',
        )

    def validate_email(self, value):
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value.lower()

    def validate(self, attrs):
        if attrs.get('password') != attrs.get('confirm_password'):
            raise serializers.ValidationError({"confirm_password": "Passwords do not match."})
        return attrs

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        password = validated_data.pop('password')
        user = User.objects.create_user(password=password, **validated_data)
        return user

class PasswordResetRequestSerializer(serializers.Serializer):
    """Serializer for password reset request"""
    email = serializers.EmailField()

    def validate_email(self, value):
        if not User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("No registered user found with this email address.")
        return value.lower()

class PasswordResetConfirmSerializer(serializers.Serializer):
    """Serializer for password reset confirmation"""
    email = serializers.EmailField()
    reset_code = serializers.CharField()
    new_password = serializers.CharField(min_length=8, write_only=True)
    confirm_password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        if attrs.get('new_password') != attrs.get('confirm_password'):
            raise serializers.ValidationError({"confirm_password": "New passwords do not match."})
        return attrs

class UserProfileUpdateSerializer(serializers.ModelSerializer):
    """Serializer for updating user profile"""
    class Meta:
        model = User
        fields = (
            'first_name',
            'last_name',
            'phone_number',
            'blood_group',
            'organization_name',
            'avatar_url'
        )
