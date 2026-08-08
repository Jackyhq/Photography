import { DialogDescription, DialogHeader, DialogTitle } from '../dialog'
import type { ModalComponent, ModalComponentProps } from '../modal/types'
import type { PromptVariant } from './PromptActions'
import { PromptActions } from './PromptActions'
import { usePromptActions } from './usePromptActions'

export type PromptOptions = {
  title: string
  description?: string
  variant?: PromptVariant
  onConfirmText?: string
  onCancelText?: string
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void | Promise<void>
  content?: React.ReactNode
}

export const BasePrompt: ModalComponent<PromptOptions> = ({
  modalId,
  dismiss,
  title,
  description,
  variant = 'info',
  onConfirmText = 'Confirm',
  onCancelText = 'Cancel',
  onConfirm,
  onCancel,
  content,
}: ModalComponentProps & PromptOptions) => {
  const { handleCancel, handleConfirm, submitting } = usePromptActions({ modalId, dismiss, onConfirm, onCancel })

  return (
    <div>
      <DialogHeader className="mb-2">
        <DialogTitle>{title}</DialogTitle>
        {description ? <DialogDescription className="text-text-secondary">{description}</DialogDescription> : null}
      </DialogHeader>
      {content && <div className="mt-4">{content}</div>}
      <PromptActions
        submitting={submitting}
        variant={variant}
        confirmText={onConfirmText}
        cancelText={onCancelText}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  )
}

BasePrompt.contentClassName = 'max-w-sm'

export type { PromptVariant } from './PromptActions'
