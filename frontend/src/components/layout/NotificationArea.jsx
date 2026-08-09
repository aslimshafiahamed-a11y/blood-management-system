import React, { useState } from 'react';
import { Bell, AlertTriangle, Droplet, CheckCircle2, Clock, X } from 'lucide-react';
import { Badge } from '../common/Badge';

export const NotificationArea = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'CRITICAL',
      title: 'Emergency Blood Request: O- Negative',
      description: 'St. Jude Hospital requested 4 Units O- for Trauma Ward.',
      time: '5 mins ago',
      read: false,
    },
    {
      id: 2,
      type: 'INFO',
      title: 'Blood Donation Session Verified',
      description: 'Donor #D-9041 passed blood screening tests.',
      time: '25 mins ago',
      read: false,
    },
    {
      id: 3,
      type: 'SUCCESS',
      title: 'Cold Chain Temp Audit Passed',
      description: 'Metropolitan Storage Unit #B-2 maintained 4.1°C.',
      time: '1 hour ago',
      read: true,
    },
  ]);

  if (!isOpen) return null;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="absolute right-0 top-14 w-80 sm:w-96 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-primary-600" />
          <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider">Emergency & System Alerts</h4>
        </div>
        <button
          onClick={markAllRead}
          className="text-[11px] text-primary-600 hover:text-primary-700 font-bold"
        >
          Mark all read
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto divide-y divide-slate-100">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-3.5 transition-colors flex items-start gap-3 ${
              n.read ? 'bg-white opacity-70' : 'bg-primary-50/30 hover:bg-slate-50'
            }`}
          >
            {n.type === 'CRITICAL' && <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />}
            {n.type === 'INFO' && <Droplet className="w-4 h-4 text-secondary-600 shrink-0 mt-0.5" />}
            {n.type === 'SUCCESS' && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}

            <div className="flex-1 text-xs">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-900">{n.title}</span>
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {n.time}
                </span>
              </div>
              <p className="text-slate-600 leading-relaxed">{n.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-2.5 text-center bg-slate-50 border-t border-slate-100">
        <span className="text-[11px] text-slate-500 font-medium">Live Telemetry Gateway Connected</span>
      </div>
    </div>
  );
};
