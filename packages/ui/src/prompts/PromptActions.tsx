import { Button } from '../button/Button'
import { DialogFooter } from '../dialog'

export type PromptVariant = 'danger' | 'info'

interface PromptActionsProps {
  submitting: boolean
  variant: PromptVariant
  confirmText: string
  cancelText: string
  onConfirm: () => void | Promise<void>
  onCancel: () => void | Promise<void>
}

export function PromptActions({
  submitting,
  variant,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}: PromptActionsProps) {
  return (
    <DialogFooter className="mt-4">
      <Button type="button" size="sm" variant="secondary" onClick={onCancel} disabled={submitting}>
        {cancelText}
      </Button>
      <Button
        type="button"
        size="sm"
        variant={variant === 'danger' ? 'destructive' : 'primary'}
        onClick={onConfirm}
        isLoading={submitting}
        loadingText={confirmText}
      >
        {confirmText}
      </Button>
    </DialogFooter>
  )
}
