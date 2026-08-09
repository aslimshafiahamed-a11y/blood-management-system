import React, { useId } from 'react';

export const Input = React.forwardRef(({
  label,
  error,
  helperText,
  icon: Icon,
  type = 'text',
  className = '',
  required = false,
  ...props
}, ref) => {
  const generatedId = useId();
  const inputId = props.id || generatedId;

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
          {label} {required && <span className="text-blood-600">*</span>}
        </label>
      )}
      <div className="relative rounded-xl shadow-subtle">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Icon className="w-4 h-4" aria-hidden="true" />
          </div>
        )}
        <input
          ref={ref}
          id={inputId}
          type={type}
          className={`w-full bg-white border ${error ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-300 focus:border-primary-500 focus:ring-primary-500/20'} text-slate-900 placeholder-slate-400 text-sm rounded-xl transition-all duration-200 block ${Icon ? 'pl-10' : 'pl-3.5'} pr-3.5 py-2.5 focus:outline-none focus:ring-4 ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
      {helperText && !error && <p className="text-xs text-slate-500">{helperText}</p>}
    </div>
  );
});

Input.displayName = 'Input';
