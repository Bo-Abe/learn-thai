import { type ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'error' | 'muted';
  size?: 'sm' | 'md';
  className?: string;
}

const variantClasses = {
  primary: 'bg-primary/20 text-primary border-primary/30',
  secondary: 'bg-secondary/20 text-secondary border-secondary/30',
  accent: 'bg-accent/20 text-accent border-accent/30',
  success: 'bg-success/20 text-success border-success/30',
  error: 'bg-error/20 text-error border-error/30',
  muted: 'bg-muted/20 text-muted border-muted/30',
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-3 py-1 text-sm',
};

export function Badge({ children, variant = 'primary', size = 'sm', className = '' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center rounded-full border font-medium
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
