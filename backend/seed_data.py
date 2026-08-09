import os
import sys
import django

sys.path.insert(0, os.path.dirname(__file__))
sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'apps'))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.accounts.models import User, UserRole, BloodGroup

def seed():
    print("--- Seeding Blood Management System Accounts ---")
    
    accounts = [
        {
            "email": "admin@bloodline.org",
            "password": "Admin@123456",
            "first_name": "Sarah",
            "last_name": "Jenkins",
            "role": UserRole.ADMIN,
            "organization_name": "Central Health Authority",
            "phone_number": "+1-800-555-0199",
            "is_staff": True,
            "is_superuser": True
        },
        {
            "email": "bank@bloodline.org",
            "password": "Bank@123456",
            "first_name": "Marcus",
            "last_name": "Vance",
            "role": UserRole.BLOOD_BANK_STAFF,
            "organization_name": "Metropolitan Blood Bank",
            "phone_number": "+1-800-555-0188",
            "is_staff": True,
        },
        {
            "email": "hospital@bloodline.org",
            "password": "Hospital@123456",
            "first_name": "Dr. Elena",
            "last_name": "Rostova",
            "role": UserRole.HOSPITAL_STAFF,
            "organization_name": "St. Jude General Hospital",
            "phone_number": "+1-800-555-0177",
            "is_staff": True,
        },
        {
            "email": "donor@bloodline.org",
            "password": "Donor@123456",
            "first_name": "Alex",
            "last_name": "Morgan",
            "role": UserRole.DONOR,
            "blood_group": BloodGroup.O_NEGATIVE,
            "phone_number": "+1-800-555-0166",
            "is_staff": False,
        }
    ]

    for acc in accounts:
        email = acc.pop('email')
        password = acc.pop('password')
        if not User.objects.filter(email=email).exists():
            user = User.objects.create_user(email=email, password=password, username=email, **acc)
            print(f"[CREATED] {email} ({user.get_role_display()})")
        else:
            print(f"[EXISTS] {email}")

    print("--- Seeding Completed Successfully ---")

if __name__ == '__main__':
    seed()
