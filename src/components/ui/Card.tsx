import { type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  variant?: 'default' | 'glass' | 'gold';
  hover?: boolean;
}

export function Card({
  children,
  variant = 'default',
  hover = true,
  className = '',
  ...props
}: CardProps) {
  const baseClasses = 'rounded-xl p-6 transition-all duration-200';

  const variantClasses = {
    default:
      'bg-surface-light dark:bg-surface-dark border border-black/5 dark:border-white/10 shadow-sm',
    glass:
      'glass-light dark:glass-dark border border-black/5 dark:border-white/10 shadow-sm',
    gold: 'bg-surface-light dark:bg-surface-dark border border-primary/30 shadow-blue',
  };

  const hoverClasses = hover
    ? 'hover:shadow-blue-lg hover:border-primary/40 hover:-translate-y-0.5 cursor-pointer'
    : '';

  return (
    <motion.div
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
