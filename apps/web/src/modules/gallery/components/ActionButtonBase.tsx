import { Button } from '@afilmory/ui/button'
import { clsxm } from '@afilmory/utils'
import type { ComponentProps } from 'react'

export type ActionButtonProps = Omit<ComponentProps<typeof Button>, 'children' | 'title'> & {
  icon: string
  title: string
  badge?: number | string
}

export const ActionButton = ({ icon, title, badge, ...props }: ActionButtonProps) => (
  <Button
    variant="ghost"
    size="sm"
    className="relative h-10 w-10 rounded-full border-0 bg-gray-100 transition-all duration-200 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
    title={title}
    aria-label={title}
    {...props}
  >
    <i className={clsxm(icon, 'text-base text-gray-600 dark:text-gray-300')} />
    {badge && (
      <span className="bg-accent absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium text-white shadow-sm">
        {badge}
      </span>
    )}
  </Button>
)
