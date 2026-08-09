# Blood Management System - Enterprise Foundation (Sprint 1)

Production-grade Blood Management System built with Clean Architecture, Django REST Framework, JWT Authentication, and React + Vite UI.

## Tech Stack

* **Frontend**: React 18, Vite, Framer Motion, Lucide Icons, Tailwind CSS, Axios, React Router DOM v6
* **Backend**: Django 5.1, Django REST Framework 3.17, SimpleJWT, DRF-Spectacular (OpenAPI 3.0 / Swagger UI)
* **Database**: SQLite (Development) / PostgreSQL Compatible
* **Authentication**: JWT (JSON Web Tokens) with Custom User Claims & Role-Based Access Control
* **Architecture**: Clean Architecture & Enterprise Role Isolation

---

## Deliverables & Architecture Overview

### 1. Folder Structure

```
blood-management-system/
├── backend/
│   ├── apps/
│   │   ├── core/                  # Base models, APIResponse wrapper, Global exception handling
│   │   └── accounts/              # Custom User model, Role permissions, JWT serializers & views
│   ├── config/
│   │   ├── settings.py            # DRF, SimpleJWT, Spectacular, CORS, Central Logging
│   │   ├── urls.py                # Main routing & Swagger endpoints
│   │   ├── wsgi.py / asgi.py
│   ├── logs/                      # Centralized log files (app.log, errors.log)
│   ├── seed_data.py               # Database seeder for demo role accounts
│   ├── requirements.txt
│   └── manage.py
├── frontend/
│   ├── src/
│   │   ├── assets/                # Healthcare SVG Illustrations
│   │   ├── components/
│   │   │   ├── common/            # Design System (Button, Card, Input, Select, Alert, Modal, Badge)
│   │   │   └── layout/            # Header, Sidebar, NotificationArea, UserProfileMenu, DashboardLayout
│   │   ├── context/               # AuthContext & Role Switcher
│   │   ├── pages/                 # Landing, Login, Register, ForgotPassword, Dashboard, Profile
│   │   ├── services/              # Axios instance with auto JWT Bearer headers & refresh
│   │   ├── styles/                # Design Tokens & index.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## Quick Start & Installation

### Backend Setup (Django REST Framework)

```bash
cd backend
python -m pip install -r requirements.txt
python manage.py makemigrations core accounts
python manage.py migrate
python seed_data.py
python manage.py test
python manage.py runserver 0.0.0.0:8000
```

#### Seeded Demo Accounts (Pass: `Password@123` format)
- **System Admin**: `admin@bloodline.org` (`Admin@123456`)
- **Blood Bank Staff**: `bank@bloodline.org` (`Bank@123456`)
- **Hospital Staff**: `hospital@bloodline.org` (`Hospital@123456`)
- **Donor**: `donor@bloodline.org` (`Donor@123456`)

#### OpenAPI & Swagger Documentation Endpoints
- **Swagger UI**: `http://localhost:8000/api/docs/`
- **ReDoc**: `http://localhost:8000/api/redoc/`
- **OpenAPI Schema**: `http://localhost:8000/api/schema/`

---

### Frontend Setup (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

App runs locally at: `http://localhost:5173/`

---

## Role-Based Access Architecture

1. **System Administrator (`ADMIN`)**: Full administrative privileges over all regional blood banks, hospital users, global inventory, and audit logs.
2. **Blood Bank Staff (`BLOOD_BANK_STAFF`)**: Access to blood inventory units, cold chain temperature logs, donation sessions, and hospital requisitions.
3. **Hospital Staff (`HOSPITAL_STAFF`)**: Access to emergency blood requisition forms, bank availability search, and transfusion logs.
4. **Donor (`DONOR`)**: Access to personal donor passport, donation appointment scheduling, and eligibility history.

---

## Development Roadmap (Sprint 2 Preview)

1. **Donor Management Module**: Health screening questionnaires, eligibility calculator, appointment booking, digital donor passport.
2. **Inventory Management Module**: Blood bag barcode tracking, shelf-life expiration alerts, blood component separation (RBC, Plasma, Platelets), cold storage temperature telemetry.
3. **Blood Request & Dispatch Module**: Real-time hospital emergency requisitions, priority queueing, dispatch driver routing, and receipt confirmations.
4. **Notification System**: WebSockets/Pusher for real-time emergency blood request broadcasts to eligible donors and regional banks.
