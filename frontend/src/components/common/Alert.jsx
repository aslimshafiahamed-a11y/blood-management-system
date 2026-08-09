import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

export const Alert = ({
  type = 'info', // 'success' | 'error' | 'warning' | 'info'
  title,
  children,
  onClose,
  className = ''
}) => {
  const configs = {
    success: {
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-900',
      icon: CheckCircle,
      iconColor: 'text-emerald-600',
    },
    error: {
      bg: 'bg-red-50 border-red-200 text-red-900',
      icon: AlertCircle,
      iconColor: 'text-red-600',
    },
    warning: {
      bg: 'bg-amber-50 border-amber-200 text-amber-900',
      icon: AlertTriangle,
      iconColor: 'text-amber-600',
    },
    info: {
      bg: 'bg-teal-50 border-teal-200 text-teal-900',
      icon: Info,
      iconColor: 'text-teal-600',
    },
  };

  const config = configs[type] || configs.info;
  const IconComponent = config.icon;

  return (
    <div className={`p-4 rounded-xl border flex items-start gap-3 shadow-subtle ${config.bg} ${className}`} role="alert">
      <IconComponent className={`w-5 h-5 mt-0.5 shrink-0 ${config.iconColor}`} aria-hidden="true" />
      <div className="flex-1 text-sm">
        {title && <h4 className="font-bold text-slate-900 mb-1">{title}</h4>}
        <div className="leading-relaxed opacity-90">{children}</div>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-black/5 transition-colors"
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
