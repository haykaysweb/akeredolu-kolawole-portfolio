import type { ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  hover?: boolean;
  glow?: boolean;
  delay?: number;
}

export function Card({
  children,
  hover = false,
  glow = false,
  delay = 0,
  className,
  ...props
}: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay, ease: 'easeOut' }}
      whileHover={hover ? { scale: 1.01 } : undefined}
      className={cn(
        'rounded-2xl border border-line bg-surface',
        glow ? 'shadow-glow-sm' : 'shadow-card',
        hover &&
          'transition-[border-color,box-shadow] duration-300 hover:border-accent/30 hover:shadow-glow-md',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}