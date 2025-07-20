import React from 'react';

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>((props, ref) => (
  <select
    ref={ref}
    className="flex h-10 w-full items-center justify-between rounded-md border border-slate-300 bg-white py-2 px-3 text-sm ring-offset-background placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
    {...props}
  >
    {props.children}
  </select>
));
Select.displayName = 'Select';