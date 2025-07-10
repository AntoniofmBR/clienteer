import { motion } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'outline' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'rounded-lg w-full font-medium transition-all px-4 py-3'

  const variants = {
    primary: 'bg-green text-foreground font-semibold hover:bg-green',
    outline: 'border border-green text-foreground hover:bg-green',
    destructive: 'bg-red',
  }

  const sizes = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-6 py-2',
    lg: 'px-8 py-3 text-lg',
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      { children }
    </motion.button>
  )
}
