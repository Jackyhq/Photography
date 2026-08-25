import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import * as React from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ReactionButton } from './Reaction'

vi.mock('react-i18next', () => ({
  ['useTranslation']: () => ({
    t: (key: string, options?: { emoji?: string }) => (options?.emoji ? `${key} ${options.emoji}` : key),
  }),
}))

vi.mock('motion/react', () => ({
  AnimatePresence: ({ children }: React.PropsWithChildren) => children,
  m: new Proxy(
    {},
    {
      get: (_target, tag: string) => tag,
    },
  ),
}))

vi.mock('~/lib/client', () => ({
  client: { actReaction: vi.fn() },
}))

vi.mock('./hooks/useAnalysis', () => ({
  ['useAnalysis']: () => ({ data: { data: { reactions: {} } }, mutate: vi.fn() }),
}))

describe('ReactionButton', () => {
  afterEach(cleanup)

  it('lets Radix close the controlled menu with Escape', async () => {
    render(<ReactionButton photoId="photo-1" />)

    const trigger = screen.getByRole('button', { name: 'photo.reaction.label' })
    fireEvent.pointerDown(trigger, { button: 0, ctrlKey: false })

    expect(await screen.findByRole('menuitem', { name: 'photo.reaction.emoji 👍' })).toBeTruthy()
    fireEvent.keyDown(document, { key: 'Escape' })

    await waitFor(() => {
      expect(screen.queryByRole('menuitem', { name: 'photo.reaction.emoji 👍' })).toBeNull()
    })
    expect(trigger.getAttribute('aria-expanded')).toBe('false')
  })
})
