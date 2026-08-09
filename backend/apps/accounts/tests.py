from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from apps.accounts.models import User, UserRole, BloodGroup

class AccountAuthenticationTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin_user = User.objects.create_user(
            email="admin_test@bloodline.org",
            password="TestPassword123",
            first_name="Admin",
            last_name="Tester",
            role=UserRole.ADMIN,
            is_staff=True,
            is_superuser=True
        )
        self.donor_user = User.objects.create_user(
            email="donor_test@bloodline.org",
            password="TestPassword123",
            first_name="Donor",
            last_name="Tester",
            role=UserRole.DONOR,
            blood_group=BloodGroup.A_POSITIVE
        )

    def test_health_check_endpoint(self):
        """Test health check API returns 200 OK and healthy status"""
        response = self.client.get('/api/v1/health/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['status'], 'healthy')

    def test_login_success(self):
        """Test authentication via login API returning JWT access/refresh tokens"""
        response = self.client.post('/api/v1/auth/login/', {
            'email': 'donor_test@bloodline.org',
            'password': 'TestPassword123'
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['success'])
        self.assertIn('access', response.data['data'])
        self.assertIn('refresh', response.data['data'])
        self.assertEqual(response.data['data']['user']['email'], 'donor_test@bloodline.org')

    def test_login_invalid_credentials(self):
        """Test login fails with standardized error format for wrong password"""
        response = self.client.post('/api/v1/auth/login/', {
            'email': 'donor_test@bloodline.org',
            'password': 'WrongPassword!'
        })
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertFalse(response.data['success'])
        self.assertEqual(response.data['code'], 'UNAUTHENTICATED')

    def test_registration_success(self):
        """Test user registration API creates new donor user"""
        response = self.client.post('/api/v1/auth/register/', {
            'email': 'newdonor@bloodline.org',
            'password': 'NewPassword123!',
            'confirm_password': 'NewPassword123!',
            'first_name': 'New',
            'last_name': 'Donor',
            'role': UserRole.DONOR,
            'blood_group': BloodGroup.B_POSITIVE,
            'phone_number': '+15550001111'
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data['success'])
        self.assertTrue(User.objects.filter(email='newdonor@bloodline.org').exists())

    def test_profile_authenticated_access(self):
        """Test profile endpoint requires authentication and returns correct profile"""
        login_res = self.client.post('/api/v1/auth/login/', {
            'email': 'donor_test@bloodline.org',
            'password': 'TestPassword123'
        })
        token = login_res.data['data']['access']
        
        # Authenticated call
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {token}')
        response = self.client.get('/api/v1/auth/profile/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['data']['email'], 'donor_test@bloodline.org')
        self.assertEqual(response.data['data']['role'], UserRole.DONOR)
