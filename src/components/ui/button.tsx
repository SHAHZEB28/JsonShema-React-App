import React from 'react';

export type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'destructive' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'icon';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
};

export const Button = ({ children, onClick, variant = 'default', size = 'md', className = '', type = 'button' }: ButtonProps) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background transform hover:scale-105 active:scale-95';
  const variants = {
    default: 'bg-slate-900 text-slate-50 hover:bg-slate-800 shadow-md hover:shadow-lg',
    destructive: 'bg-red-600 text-slate-50 hover:bg-red-700 shadow-md hover:shadow-lg',
    outline: 'border border-slate-300 bg-white hover:bg-slate-100 hover:text-slate-900 shadow-sm hover:shadow-md',
    ghost: 'hover:bg-slate-100 hover:text-slate-900',
  };
  const sizes = {
    sm: 'h-9 px-3',
    md: 'h-10 py-2 px-4',
    icon: 'h-10 w-10',
  };
  return (
    <button type={type} onClick={onClick} className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </button>
  );
};