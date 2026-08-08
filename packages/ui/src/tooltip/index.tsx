import { clsxm, Spring } from '@afilmory/utils'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { m } from 'motion/react'
import * as React from 'react'

import { glassInnerGlowBackground, glassSurfaceStyle } from '../styles/glass'
import { tooltipStyle } from './styles'

const TooltipProvider = TooltipPrimitive.Provider
const TooltipRoot = TooltipPrimitive.Root

const Tooltip: typeof TooltipProvider = ({ children, ...props }) => (
  <TooltipProvider {...props}>
    <TooltipPrimitive.Tooltip>{children}</TooltipPrimitive.Tooltip>
  </TooltipProvider>
)

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = ({
  ref,
  className,
  sideOffset = 4,
  ...props
}: React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content> & {
  ref?: React.Ref<React.ElementRef<typeof TooltipPrimitive.Content> | null>
}) => (
  <TooltipPrimitive.Content
    ref={ref}
    asChild
    sideOffset={sideOffset}
    className={clsxm(tooltipStyle.content, className)}
    {...props}
  >
    <m.div
      className="border-accent/20 relative overflow-hidden border"
      style={glassSurfaceStyle}
      initial={{ opacity: 0, scale: 0.95, y: 4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 4 }}
      transition={Spring.presets.snappy}
    >
      {/* Inner glow layer */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl"
        style={{ background: glassInnerGlowBackground }}
      />

      {/* Content */}
      <div className="relative">{props.children}</div>
    </m.div>
  </TooltipPrimitive.Content>
)
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipContent, TooltipRoot, TooltipTrigger }

export { RootPortal as TooltipPortal } from '../portal'
