import React from 'react';

export const Card = ({ children, className = '', ...props }) => (
  <div
    className={`bg-white border border-slate-200/80 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-200 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-4 pb-3 border-b border-slate-100 flex items-center justify-between ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-base font-bold text-slate-900 flex items-center gap-2 tracking-tight ${className}`}>
    {children}
  </h3>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`text-slate-600 text-sm ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-3 ${className}`}>
    {children}
  </div>
);
