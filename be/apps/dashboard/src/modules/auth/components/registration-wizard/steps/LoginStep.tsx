import { Button } from '@afilmory/ui'
import { cx } from '@afilmory/utils'
import type { FC } from 'react'

import type { BetterAuthUser } from '~/modules/auth/types'

import { SocialAuthButtons } from '../../SocialAuthButtons'

type LoginStepProps = {
  user: BetterAuthUser | null
  isAuthenticated: boolean
  onContinue: () => void
  isContinuing: boolean
}

export const LoginStep: FC<LoginStepProps> = ({ user, isAuthenticated, onContinue, isContinuing }) => (
  <div className="space-y-8">
    <section className="space-y-3">
      <h2 className="text-text text-lg font-semibold">Sign in to continue</h2>
      <p className="text-text-secondary text-sm">
        Use your organization&apos;s identity provider to create a workspace. We&apos;ll use your profile details to set
        up the initial administrator.
      </p>
    </section>

    {!isAuthenticated ? (
      <div className="space-y-4">
        <div className="bg-fill/40 rounded-2xl border border-white/5 px-6 py-5">
          <p className="text-text-secondary text-sm">
            Choose your provider below. After completing the sign-in flow you&apos;ll return here automatically.
          </p>
        </div>
        <SocialAuthButtons className="max-w-sm" requestSignUp layout="row" />
      </div>
    ) : (
      <div className="bg-fill/40 rounded-2xl border border-white/5 p-6">
        <p className="text-text-secondary text-sm">You&apos;re signed in as</p>
        <div className="text-text mt-2 text-lg font-semibold">{user?.name || user?.email}</div>
        <div className="text-text-tertiary text-sm">{user?.email}</div>
        <Button
          type="button"
          variant="primary"
          size="md"
          className={cx('mt-6 min-w-[200px]')}
          onClick={onContinue}
          isLoading={isContinuing}
        >
          Continue setup
        </Button>
      </div>
    )}
  </div>
)
