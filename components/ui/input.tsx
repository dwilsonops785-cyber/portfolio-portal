import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <div className="mb-4">
      {label && <label className="label">{label}</label>}
      <input className={`input ${error ? 'border-error' : ''} ${className}`} {...props} />
      {error && <p className="text-error text-sm mt-1">{error}</p>}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className = '', ...props }: TextareaProps) {
  return (
    <div className="mb-4">
      {label && <label className="label">{label}</label>}
      <textarea
        className={`input ${error ? 'border-error' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-error text-sm mt-1">{error}</p>}
    </div>
  );
}
