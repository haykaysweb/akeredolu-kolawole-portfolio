import type { ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  icon?: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-accent font-semibold text-bg shadow-glow-sm hover:bg-accent-light hover:shadow-glow-md',
  secondary: 'border border-line bg-surface-2 text-foreground hover:border-accent/40',
  ghost: 'text-muted hover:bg-surface-2 hover:text-foreground',
  outline: 'border border-accent/40 text-accent hover:bg-accent/10 hover:shadow-glow-sm',
};

const sizeClasses: Record<Size, string> = {
  sm: 'gap-1.5 rounded-lg px-3 py-1.5 text-sm',
  md: 'gap-2 rounded-xl px-4 py-2.5 text-sm',
  lg: 'gap-2.5 rounded-xl px-6 py-3 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  icon,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      whileHover={props.disabled ? undefined : { scale: 1.03 }}
      whileTap={props.disabled ? undefined : { scale: 0.97 }}
      className={cn(
        'inline-flex items-center justify-center transition-[background-color,border-color,box-shadow,color] duration-200 disabled:cursor-not-allowed disabled:opacity-60',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </motion.button>
  );
}