import { useState } from 'react'

import { DialogDescription, DialogHeader, DialogTitle } from '../dialog'
import { Input } from '../form/Input'
import type { ModalComponent, ModalComponentProps } from '../modal/types'
import type { PromptVariant } from './PromptActions'
import { PromptActions } from './PromptActions'
import { usePromptActions } from './usePromptActions'

type InputPromptVariant = PromptVariant

export type InputPromptOptions = {
  title: string
  description?: string
  defaultValue?: string
  placeholder?: string
  variant?: InputPromptVariant
  type?: 'password' | 'text'
  onConfirmText?: string
  onCancelText?: string
  onConfirm?: (value: string) => void | Promise<void>
  onCancel?: () => void | Promise<void>
}

export const InputPrompt: ModalComponent<InputPromptOptions> = ({
  modalId,
  dismiss,
  title,
  description,
  defaultValue = '',
  placeholder,
  variant = 'info',
  type = 'text',
  onConfirmText = 'Confirm',
  onCancelText = 'Cancel',
  onConfirm,
  onCancel,
}: ModalComponentProps & InputPromptOptions) => {
  const [inputValue, setInputValue] = useState(defaultValue)
  const { handleCancel, handleConfirm, submitting } = usePromptActions({
    modalId,
    dismiss,
    onCancel,
    onConfirm: () => onConfirm?.(inputValue),
  })

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleConfirm()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      handleCancel()
    }
  }

  return (
    <div>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        {description ? <DialogDescription className="text-text-secondary">{description}</DialogDescription> : null}
      </DialogHeader>
      <div className="mt-4">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          autoFocus
          type={type}
        />
      </div>
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

InputPrompt.contentClassName = 'max-w-sm'

export type { InputPromptVariant }
