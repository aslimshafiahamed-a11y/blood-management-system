import uuid
from django.db import models

class UUIDModel(models.Model):
    """Abstract model adding UUID primary key"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    class Meta:
        abstract = True

class TimeStampedModel(models.Model):
    """Abstract model tracking creation and last modification timestamps"""
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class IsActiveModel(models.Model):
    """Abstract model providing soft-delete / status flag"""
    is_active = models.BooleanField(default=True, db_index=True)

    class Meta:
        abstract = True

class BaseModel(UUIDModel, TimeStampedModel, IsActiveModel):
    """Enterprise base model inheriting UUID, timestamps, and active flag"""

    class Meta:
        abstract = True
