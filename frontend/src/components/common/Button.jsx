import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'blood' | 'outline' | 'ghost' | 'danger'
  size = 'md', // 'sm' | 'md' | 'lg'
  isLoading = false,
  disabled = false,
  className = '',
  type = 'button',
  onClick,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none select-none cursor-pointer';

  const variants = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-sm hover:shadow-md border border-primary-600/20',
    secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white shadow-sm hover:shadow-md border border-secondary-700/20',
    blood: 'bg-blood-600 hover:bg-blood-700 text-white shadow-sm hover:shadow-md border border-blood-700/20',
    outline: 'bg-white border border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-50 shadow-subtle',
    ghost: 'text-slate-600 hover:text-slate-900 hover:bg-slate-100',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-[14px] gap-1.5',
    md: 'px-4 py-2 text-[14px] gap-2',
    lg: 'px-6 py-3 text-[16px] font-bold gap-2.5',
  };

  return (
    <motion.button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      whileHover={{ scale: disabled || isLoading ? 1 : 1.03 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current shrink-0" aria-hidden="true" />}
      <span>{children}</span>
    </motion.button>
  );
};
