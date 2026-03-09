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
  const baseClasses = 'rounded-2xl p-6 transition-all duration-300';

  const variantClasses = {
    default:
      'bg-surface-dark/80 dark:bg-surface-dark/80 bg-surface-light/80 border border-white/5',
    glass:
      'glass-dark dark:glass-dark glass-light border border-white/10',
    gold: 'bg-surface-dark/80 dark:bg-surface-dark/80 bg-surface-light/80 border border-primary/20 shadow-gold',
  };

  const hoverClasses = hover
    ? 'hover:shadow-gold-lg hover:border-primary/30 hover:-translate-y-1 cursor-pointer'
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
