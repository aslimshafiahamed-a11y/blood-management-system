import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Droplet,
  HeartHandshake,
  Building2,
  Users,
  Bell,
  ShieldCheck,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Activity,
  FileText,
  Settings
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const Sidebar = () => {
  const { user, logout, role } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const getNavItems = () => {
    const common = [
      { path: '/dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    ];

    if (role === 'ADMIN') {
      return [
        ...common,
        { path: '/dashboard/users', label: 'User Directory', icon: Users },
        { path: '/dashboard/blood-banks', label: 'Blood Banks', icon: Building2 },
        { path: '/dashboard/inventory', label: 'Global Stock Audit', icon: Droplet },
        { path: '/dashboard/analytics', label: 'System Analytics', icon: Activity },
        { path: '/dashboard/audit-logs', label: 'Security Logs', icon: ShieldCheck },
      ];
    }

    if (role === 'BLOOD_BANK_STAFF') {
      return [
        ...common,
        { path: '/dashboard/inventory', label: 'Blood Inventory', icon: Droplet, badge: 'Live' },
        { path: '/dashboard/donations', label: 'Donation Sessions', icon: HeartHandshake },
        { path: '/dashboard/requests', label: 'Hospital Orders', icon: Building2, badge: '3 New' },
        { path: '/dashboard/reports', label: 'Quality Reports', icon: FileText },
      ];
    }

    if (role === 'HOSPITAL_STAFF') {
      return [
        ...common,
        { path: '/dashboard/requests', label: 'Emergency Requisitions', icon: Droplet, badge: 'Urgent' },
        { path: '/dashboard/inventory', label: 'Bank Availability', icon: Building2 },
        { path: '/dashboard/transfusions', label: 'Transfusion Logs', icon: Activity },
      ];
    }

    // Default Donor Nav
    return [
      ...common,
      { path: '/dashboard/donations', label: 'My Donations', icon: HeartHandshake },
      { path: '/dashboard/appointments', label: 'Schedule Appointment', icon: Droplet },
      { path: '/dashboard/eligibility', label: 'Donor Passport', icon: ShieldCheck },
    ];
  };

  const navItems = getNavItems();

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-40 bg-white border-r border-slate-200/90 transition-all duration-300 flex flex-col ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 px-4 flex items-center justify-between border-b border-slate-100">
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary-500 to-primary-600 flex items-center justify-center shadow-glow-teal shrink-0 group-hover:scale-105 transition-transform">
            <Droplet className="w-5 h-5 text-white fill-white/20" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="font-extrabold text-lg text-slate-900 tracking-tight leading-none">
                Blood<span className="text-primary-500">Line</span>
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Healthcare SaaS</span>
            </div>
          )}
        </NavLink>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Role Scope */}
      {!collapsed && user && (
        <div className="px-4 py-2.5 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500">Active Scope:</span>
          <Badge variant={role === 'ADMIN' ? 'danger' : role === 'BLOOD_BANK_STAFF' ? 'blood' : role === 'HOSPITAL_STAFF' ? 'secondary' : 'primary'} size="sm">
            {user.role_display || role}
          </Badge>
        </div>
      )}

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-200 group font-medium text-xs ${
                  isActive
                    ? 'bg-primary-50 text-primary-700 font-extrabold border-r-4 border-primary-500 shadow-subtle'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`
              }
            >
              <div className="flex items-center gap-3">
                <Icon className="w-4 h-4 shrink-0 group-hover:translate-x-1 group-hover:scale-110 transition-all duration-200" />
                {!collapsed && <span>{item.label}</span>}
              </div>
              {!collapsed && item.badge && (
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-primary-100 text-primary-700">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Sign Out */}
      <div className="p-3 border-t border-slate-100">
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-slate-600 hover:text-red-600 hover:bg-red-50 transition-all text-xs font-semibold group"
        >
          <LogOut className="w-4 h-4 shrink-0 group-hover:-translate-x-0.5 transition-transform" />
          {!collapsed && <span>Sign Out Workspace</span>}
        </button>
      </div>
    </aside>
  );
};
