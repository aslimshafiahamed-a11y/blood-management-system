import React from 'react';

export const Badge = ({
  children,
  variant = 'neutral', // 'primary' | 'secondary' | 'blood' | 'success' | 'warning' | 'danger' | 'neutral'
  size = 'md',
  pulse = false,
  className = ''
}) => {
  const base = 'inline-flex items-center font-bold tracking-wide rounded-full border transition-colors';

  const variants = {
    primary: 'bg-primary-50 text-primary-700 border-primary-200',
    secondary: 'bg-secondary-50 text-secondary-700 border-secondary-200',
    blood: 'bg-blood-50 text-blood-700 border-blood-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-red-50 text-red-700 border-red-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[11px]',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3.5 py-1.5 text-xs font-extrabold',
  };

  return (
    <span className={`${base} ${variants[variant] || variants.neutral} ${sizes[size] || sizes.md} ${pulse ? 'animate-pulse' : ''} ${className}`}>
      {pulse && <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-ping" />}
      {children}
    </span>
  );
};
