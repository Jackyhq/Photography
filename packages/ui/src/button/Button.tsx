// Tremor Button [v0.2.0]

import { clsxm } from '@afilmory/utils'
import { Slot } from '@radix-ui/react-slot'
import { m } from 'motion/react'
import * as React from 'react'
import type { VariantProps } from 'tailwind-variants'

import { buttonVariants } from './buttonVariants'

interface ButtonProps extends React.ComponentPropsWithoutRef<'button'>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
  loadingText?: string
}

const Button = ({
  ref: forwardedRef,
  asChild,
  isLoading = false,
  loadingText,
  className,
  disabled,
  variant,
  size,
  flat,
  children,
  ...props
}: ButtonProps & {
  ref?: React.RefObject<HTMLButtonElement>
}) => {
  const Component = asChild ? Slot : m.button
  return (
    // @ts-expect-error
    <Component
      ref={forwardedRef}
      className={clsxm(buttonVariants({ variant, size, flat }), className)}
      disabled={disabled || isLoading}
      data-tremor-id="tremor-raw"
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {isLoading ? (
        <span className="pointer-events-none inline-flex items-center justify-center gap-1.5">
          <i
            className={clsxm(
              'shrink-0 animate-spin i-mingcute-loading-3-line !duration-1000',
              size === 'xs' || size === 'sm' ? 'size-3' : 'size-4',
            )}
            aria-hidden="true"
          />
          <span className="sr-only">{loadingText ?? 'Loading'}</span>
          <span className="inline-block">{loadingText ?? children}</span>
        </span>
      ) : (
        children
      )}
    </Component>
  )
}

Button.displayName = 'Button'

export { Button, type ButtonProps }
