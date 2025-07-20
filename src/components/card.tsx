// src/components/ui/Card.tsx
import React from 'react';

export const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`rounded-xl border border-slate-200 bg-white/80 backdrop-blur-sm text-slate-950 shadow-lg ${className}`}>
        {children}
    </div>
);

export const CardContent = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`p-4 sm:p-6 ${className}`}>
        {children}
    </div>
);