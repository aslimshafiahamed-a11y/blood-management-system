import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({ children, className = '', hoverEffect = true, ...props }) => (
  <motion.div
    whileHover={hoverEffect ? { y: -4, transition: { duration: 0.2, ease: 'easeOut' } } : {}}
    className={`bg-white border border-slate-200/85 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow duration-200 ${className}`}
    {...props}
  >
    {children}
  </motion.div>
);

export const CardHeader = ({ children, className = '' }) => (
  <div className={`mb-4 pb-3 border-b border-slate-100 flex items-center justify-between ${className}`}>
    {children}
  </div>
);

export const CardTitle = ({ children, className = '' }) => (
  <h3 className={`text-[20px] leading-[28px] font-bold text-slate-900 flex items-center gap-2 tracking-tight ${className}`}>
    {children}
  </h3>
);

export const CardContent = ({ children, className = '' }) => (
  <div className={`text-slate-600 text-[16px] leading-[26px] ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`mt-6 pt-4 border-t border-slate-100 flex items-center justify-end gap-3 ${className}`}>
    {children}
  </div>
);
