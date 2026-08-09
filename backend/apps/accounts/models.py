import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from apps.core.models import TimeStampedModel

class UserRole(models.TextChoices):
    ADMIN = 'ADMIN', 'System Administrator'
    BLOOD_BANK_STAFF = 'BLOOD_BANK_STAFF', 'Blood Bank Staff'
    HOSPITAL_STAFF = 'HOSPITAL_STAFF', 'Hospital Staff'
    DONOR = 'DONOR', 'Donor'

class BloodGroup(models.TextChoices):
    A_POSITIVE = 'A+', 'A Positive (A+)'
    A_NEGATIVE = 'A-', 'A Negative (A-)'
    B_POSITIVE = 'B+', 'B Positive (B+)'
    B_NEGATIVE = 'B-', 'B Negative (B-)'
    AB_POSITIVE = 'AB+', 'AB Positive (AB+)'
    AB_NEGATIVE = 'AB-', 'AB Negative (AB-)'
    O_POSITIVE = 'O+', 'O Positive (O+)'
    O_NEGATIVE = 'O-', 'O Negative (O-)'

class UserManager(BaseUserManager):
    """Custom user manager where email is the unique identifier for authentication"""

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email address must be specified')
        email = self.normalize_email(email)
        extra_fields.setdefault('username', email)
        user = self.model(email=email, **extra_fields)
        if password:
            user.set_password(password)
        else:
            user.set_unusable_password()
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('role', UserRole.ADMIN)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class User(AbstractUser, TimeStampedModel):
    """Enterprise custom User model with role-based access control"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField('email address', unique=True)
    first_name = models.CharField('first name', max_length=150, blank=True)
    last_name = models.CharField('last name', max_length=150, blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    role = models.CharField(
        max_length=30,
        choices=UserRole.choices,
        default=UserRole.DONOR,
        db_index=True
    )
    blood_group = models.CharField(
        max_length=5,
        choices=BloodGroup.choices,
        blank=True,
        null=True
    )
    organization_name = models.CharField(
        max_length=255,
        blank=True,
        help_text='Hospital or Blood Bank name'
    )
    is_verified = models.BooleanField(default=True)
    avatar_url = models.URLField(blank=True, null=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.get_full_name() or self.email} ({self.get_role_display()})"

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip() or self.email
