import React from 'react';

// 1. Blood Donation Hero Illustration
export const BloodDonationHero = ({ className = "w-full h-auto" }) => (
  <svg viewBox="0 0 600 450" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <defs>
      <linearGradient id="heroTealGrad" x1="0" y1="0" x2="600" y2="450" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0EA5A4" stopOpacity="0.15"/>
        <stop offset="0.5" stopColor="#2563EB" stopOpacity="0.1"/>
        <stop offset="1" stopColor="#F8FAFC" stopOpacity="0.8"/>
      </linearGradient>
      <linearGradient id="bloodDropGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#EF4444"/>
        <stop offset="100%" stopColor="#DC2626"/>
      </linearGradient>
    </defs>
    
    {/* Soft Light Background Ring */}
    <circle cx="300" cy="225" r="180" fill="url(#heroTealGrad)"/>
    
    {/* Main Heart & Blood Drop Shield */}
    <path d="M300 350C250 350 160 280 160 210C160 160 195 130 240 130C270 130 290 145 300 160C310 145 330 130 360 130C405 130 440 160 440 210C440 280 350 350 300 350Z" fill="url(#bloodDropGrad)" opacity="0.95"/>
    
    {/* Clean Pulse ECG Line */}
    <path d="M120 225H220L235 180L255 270L275 190L295 240L310 215L325 225H480" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    
    {/* Floating Healthcare Badges */}
    <g transform="translate(110, 110)">
      <rect x="0" y="0" width="70" height="70" rx="18" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.05))"/>
      <circle cx="35" cy="35" r="18" fill="#CCFBF1"/>
      <path d="M35 24V46M24 35H46" stroke="#0EA5A4" strokeWidth="4" strokeLinecap="round"/>
    </g>

    <g transform="translate(420, 100)">
      <rect x="0" y="0" width="70" height="70" rx="18" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.05))"/>
      <circle cx="35" cy="35" r="18" fill="#DBEAFE"/>
      <path d="M27 35L33 41L43 29" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
  </svg>
);

// 2. Healthcare Analytics Illustration
export const HealthcareAnalytics = ({ className = "w-full h-auto" }) => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="400" height="300" rx="20" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2"/>
    <path d="M40 220L110 160L180 190L260 110L360 140" stroke="#0EA5A4" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M40 220L110 160L180 190L260 110L360 140V240H40V220Z" fill="url(#analyticsGrad)" opacity="0.15"/>
    <circle cx="260" cy="110" r="8" fill="#2563EB"/>
    <defs>
      <linearGradient id="analyticsGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0EA5A4"/>
        <stop offset="100%" stopColor="#FFFFFF"/>
      </linearGradient>
    </defs>
  </svg>
);

// 3. Hospital Management Illustration
export const HospitalManagement = ({ className = "w-full h-auto" }) => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="400" height="300" rx="20" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2"/>
    <rect x="120" y="80" width="160" height="180" rx="12" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2"/>
    <path d="M200 100V130M185 115H215" stroke="#DC2626" strokeWidth="4" strokeLinecap="round"/>
    <rect x="150" y="150" width="30" height="30" rx="4" fill="#F1F5F9"/>
    <rect x="220" y="150" width="30" height="30" rx="4" fill="#F1F5F9"/>
  </svg>
);

// 4. Blood Inventory Illustration
export const BloodInventory = ({ className = "w-full h-auto" }) => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect width="400" height="300" rx="20" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2"/>
    <g transform="translate(60, 60)">
      <rect x="0" y="0" width="80" height="140" rx="12" fill="#FEF2F2" stroke="#DC2626" strokeWidth="2"/>
      <path d="M0 60C20 60 40 70 80 65V128C80 134 74 140 68 140H12C6 140 0 134 0 128V60Z" fill="#DC2626"/>
      <text x="40" y="40" textAnchor="middle" fill="#DC2626" fontWeight="bold" fontSize="18">O-</text>
    </g>
    <g transform="translate(160, 60)">
      <rect x="0" y="0" width="80" height="140" rx="12" fill="#F0FDFA" stroke="#0EA5A4" strokeWidth="2"/>
      <path d="M0 40C30 40 50 50 80 45V128C80 134 74 140 68 140H12C6 140 0 134 0 128V40Z" fill="#0EA5A4"/>
      <text x="40" y="30" textAnchor="middle" fill="#0EA5A4" fontWeight="bold" fontSize="18">A+</text>
    </g>
    <g transform="translate(260, 60)">
      <rect x="0" y="0" width="80" height="140" rx="12" fill="#EFF6FF" stroke="#2563EB" strokeWidth="2"/>
      <path d="M0 50C20 50 40 60 80 55V128C80 134 74 140 68 140H12C6 140 0 134 0 128V50Z" fill="#2563EB"/>
      <text x="40" y="35" textAnchor="middle" fill="#2563EB" fontWeight="bold" fontSize="18">B+</text>
    </g>
  </svg>
);

// 5. Donor Registration Illustration
export const DonorRegistration = ({ className = "w-full h-auto" }) => (
  <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="200" cy="150" r="100" fill="#F0FDFA"/>
    <path d="M200 90L260 120V180C260 220 230 250 200 260C170 250 140 220 140 180V120L200 90Z" fill="#FFFFFF" stroke="#0EA5A4" strokeWidth="3"/>
    <circle cx="200" cy="160" r="24" fill="#CCFBF1"/>
    <path d="M190 160L197 167L212 152" stroke="#0EA5A4" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
