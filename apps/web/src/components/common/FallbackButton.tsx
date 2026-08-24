import type { ComponentPropsWithoutRef } from 'react'

const variantClassNames = {
  primary: 'border-transparent bg-material-opaque text-text-vibrant hover:bg-control-enabled/90',
  secondary: 'border-fill-tertiary bg-material-thin text-text hover:bg-fill-tertiary',
} as const

interface FallbackButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: keyof typeof variantClassNames
}

export const FallbackButton = ({
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}: FallbackButtonProps) => (
  <button
    {...props}
    type={type}
    className={`focus-visible:ring-accent/40 inline-flex h-10 items-center justify-center rounded-lg border px-4 font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ${variantClassNames[variant]} ${className}`}
  />
)
