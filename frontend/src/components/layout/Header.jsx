import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Search, Bell, ShieldAlert, ChevronDown, Sparkles } from 'lucide-react';
import { NotificationArea } from './NotificationArea';
import { UserProfileMenu } from './UserProfileMenu';

export const Header = () => {
  const { user, role, demoLogin } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isDemoSwitching, setIsDemoSwitching] = useState(false);

  const handleRoleSwitch = async (newRole) => {
    setIsDemoSwitching(true);
    await demoLogin(newRole);
    setIsDemoSwitching(false);
  };

  return (
    <header className="h-16 bg-white/90 border-b border-slate-200 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-subtle">
      {/* Search Input */}
      <div className="relative w-48 sm:w-80">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          placeholder="Search blood type, request ID, hospital..."
          className="w-full bg-slate-50 border border-slate-200 focus:border-primary-500 focus:bg-white text-xs rounded-xl pl-9 pr-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Quick Demo Role Switcher */}
        <div className="hidden md:flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 shadow-subtle">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-[11px] text-slate-500 font-semibold">Demo Role:</span>
          <select
            value={role || 'DONOR'}
            onChange={(e) => handleRoleSwitch(e.target.value)}
            disabled={isDemoSwitching}
            className="bg-transparent text-xs font-bold text-primary-600 focus:outline-none cursor-pointer"
          >
            <option value="ADMIN" className="bg-white text-slate-900">Admin</option>
            <option value="BLOOD_BANK_STAFF" className="bg-white text-slate-900">Blood Bank Staff</option>
            <option value="HOSPITAL_STAFF" className="bg-white text-slate-900">Hospital Staff</option>
            <option value="DONOR" className="bg-white text-slate-900">Donor</option>
          </select>
        </div>

        {/* Emergency Alert Tag */}
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 text-xs font-bold transition-all animate-pulse"
        >
          <ShieldAlert className="w-4 h-4 text-red-600" />
          <span>Emergency Dispatch Active</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-blood-600 rounded-full ring-2 ring-white" />
          </button>
          <NotificationArea isOpen={showNotifications} onClose={() => setShowNotifications(false)} />
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-500 to-secondary-600 flex items-center justify-center text-white font-bold text-xs shadow-xs">
              {user?.first_name ? user.first_name[0] : 'U'}
            </div>
            <div className="hidden sm:block text-left text-xs min-w-0 max-w-[100px]">
              <span className="font-bold text-slate-800 block truncate">{user?.first_name || 'User'}</span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
          <UserProfileMenu isOpen={showProfileMenu} onClose={() => setShowProfileMenu(false)} />
        </div>
      </div>
    </header>
  );
};
