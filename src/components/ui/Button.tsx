import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-dark shadow-blue active:scale-95',
  secondary:
    'bg-secondary text-white hover:bg-secondary-light active:scale-95',
  accent:
    'bg-accent text-white hover:bg-accent-light active:scale-95',
  ghost:
    'bg-transparent hover:bg-black/5 dark:hover:bg-white/10',
  outline:
    'border border-primary text-primary hover:bg-primary/10 active:scale-95',
};

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'px-3 py-1.5 text-sm rounded-full',
  md: 'px-5 py-2.5 text-base rounded-full',
  lg: 'px-7 py-3.5 text-lg rounded-full',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.97 }}
        className={`
          inline-flex items-center justify-center gap-2
          font-sans font-medium
          transition-colors duration-200
          focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variantClasses[variant]}
          ${sizeClasses[size]}
          ${className}
        `}
        {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
      >
        {children}
      </motion.button>
    );
  },
);

Button.displayName = 'Button';
