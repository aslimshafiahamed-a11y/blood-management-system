import React from 'react';

// 1. No Donors Empty State
export const NoDonorsState = ({ className = "w-40 h-40 mx-auto" }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="100" cy="100" r="80" fill="#F0FDFA" stroke="#CCFBF1" strokeWidth="2"/>
    <circle cx="100" cy="80" r="28" fill="#99F6E4"/>
    <path d="M50 160C50 135 70 120 100 120C130 120 150 135 150 160" fill="#2DD4BF"/>
    <path d="M125 45L155 75M155 45L125 75" stroke="#0EA5A4" strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

// 2. No Requests Empty State
export const NoRequestsState = ({ className = "w-40 h-40 mx-auto" }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="100" cy="100" r="80" fill="#EFF6FF" stroke="#BFDBFE" strokeWidth="2"/>
    <rect x="60" y="50" width="80" height="100" rx="8" fill="#FFFFFF" stroke="#3B82F6" strokeWidth="2"/>
    <path d="M80 80H120M80 100H120M80 120H100" stroke="#93C5FD" strokeWidth="3" strokeLinecap="round"/>
    <circle cx="140" cy="140" r="20" fill="#2563EB"/>
    <path d="M133 140L138 145L148 135" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round"/>
  </svg>
);

// 3. No Inventory Empty State
export const NoInventoryState = ({ className = "w-40 h-40 mx-auto" }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="100" cy="100" r="80" fill="#FEF2F2" stroke="#FFC8C8" strokeWidth="2"/>
    <path d="M100 50C100 50 140 100 140 130C140 152 122 170 100 170C78 170 60 152 60 130C60 100 100 50 100 50Z" fill="#FFFFFF" stroke="#DC2626" strokeWidth="2"/>
    <path d="M85 130H115" stroke="#EF4444" strokeWidth="4" strokeLinecap="round"/>
  </svg>
);

// 4. No Hospitals Empty State
export const NoHospitalsState = ({ className = "w-40 h-40 mx-auto" }) => (
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <circle cx="100" cy="100" r="80" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="2"/>
    <rect x="60" y="70" width="80" height="90" rx="6" fill="#FFFFFF" stroke="#64748B" strokeWidth="2"/>
    <path d="M100 80V100M90 90H110" stroke="#DC2626" strokeWidth="3" strokeLinecap="round"/>
    <rect x="75" y="115" width="15" height="15" fill="#E2E8F0"/>
    <rect x="110" y="115" width="15" height="15" fill="#E2E8F0"/>
  </svg>
);
