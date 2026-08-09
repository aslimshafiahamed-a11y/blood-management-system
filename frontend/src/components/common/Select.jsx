import React, { useId } from 'react';

export const Select = React.forwardRef(({
  label,
  options = [],
  error,
  icon: Icon,
  className = '',
  required = false,
  ...props
}, ref) => {
  const generatedId = useId();
  const selectId = props.id || generatedId;

  return (
    <div className="w-full space-y-1.5">
      {label && (
        <label htmlFor={selectId} className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
          {label} {required && <span className="text-blood-600">*</span>}
        </label>
      )}
      <div className="relative rounded-xl shadow-subtle">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Icon className="w-4 h-4" aria-hidden="true" />
          </div>
        )}
        <select
          ref={ref}
          id={selectId}
          className={`w-full bg-white border ${error ? 'border-red-500' : 'border-slate-300 focus:border-primary-500 focus:ring-primary-500/20'} text-slate-900 text-sm rounded-xl transition-all duration-200 block ${Icon ? 'pl-10' : 'pl-3.5'} pr-8 py-2.5 focus:outline-none focus:ring-4 ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-white text-slate-900">
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
    </div>
  );
});

Select.displayName = 'Select';
