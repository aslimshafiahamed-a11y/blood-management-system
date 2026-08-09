import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { User, Shield, LogOut, Building, Phone } from 'lucide-react';
import { Badge } from '../common/Badge';

export const UserProfileMenu = ({ isOpen, onClose }) => {
  const { user, logout, role } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-14 w-72 bg-white rounded-2xl border border-slate-200 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
      {/* Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-500 to-secondary-600 flex items-center justify-center font-bold text-white text-base shadow-sm shrink-0">
          {user?.first_name ? user.first_name[0] : 'U'}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm text-slate-900 truncate">{user?.full_name || 'System User'}</h4>
          <p className="text-xs text-slate-500 truncate">{user?.email}</p>
          <div className="mt-1">
            <Badge variant={role === 'ADMIN' ? 'danger' : role === 'BLOOD_BANK_STAFF' ? 'blood' : 'secondary'} size="sm">
              {user?.role_display || role}
            </Badge>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="py-3 space-y-2 text-xs text-slate-600 border-b border-slate-100">
        {user?.organization_name && (
          <div className="flex items-center gap-2 text-slate-500">
            <Building className="w-3.5 h-3.5 text-primary-500" />
            <span className="truncate">{user.organization_name}</span>
          </div>
        )}
        {user?.phone_number && (
          <div className="flex items-center gap-2 text-slate-500">
            <Phone className="w-3.5 h-3.5 text-blood-600" />
            <span>{user.phone_number}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="pt-2 space-y-1">
        <button
          onClick={() => {
            onClose();
            navigate('/dashboard/profile');
          }}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
        >
          <User className="w-4 h-4 text-slate-400" />
          <span>My Profile & Security</span>
        </button>
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};
