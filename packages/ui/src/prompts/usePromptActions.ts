import { useState } from 'react'

import { Modal } from '../modal'
import type { ModalComponentProps } from '../modal/types'

interface UsePromptActionsOptions extends ModalComponentProps {
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void | Promise<void>
}

export function usePromptActions({ modalId, dismiss, onConfirm, onCancel }: UsePromptActionsOptions) {
  const [submitting, setSubmitting] = useState(false)

  const handleCancel = async () => {
    try {
      await onCancel?.()
    } finally {
      dismiss()
    }
  }

  const handleConfirm = async () => {
    try {
      setSubmitting(true)
      await onConfirm?.()
    } finally {
      setSubmitting(false)
      Modal.dismiss(modalId)
    }
  }

  return { handleCancel, handleConfirm, submitting }
}
