import { Button, Input, Label } from '@afilmory/ui'
import { Spring } from '@afilmory/utils'
import { m } from 'motion/react'
import { useMemo, useState } from 'react'

import { SocialAuthButtons } from '~/modules/auth/components/SocialAuthButtons'
import { useLogin } from '~/modules/auth/hooks/useLogin'
import { getTenantSlugFromHost } from '~/modules/auth/utils/domain'
import { LinearBorderContainer } from '~/modules/welcome/components/LinearBorderContainer'

export function Component() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading, error, clearError } = useLogin()
  const tenantSlug = useMemo(() => {
    if (typeof window === 'undefined') {
      return null
    }
    return getTenantSlugFromHost(window.location.hostname)
  }, [])
  const showEmailLogin = !tenantSlug

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!email.trim() || !password.trim()) {
      return
    }

    login({ email: email.trim(), password })
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (error) clearError()
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if (error) clearError()
  }

  return (
    <div className="relative flex min-h-dvh flex-1 flex-col">
      <div className="bg-background flex flex-1 items-center justify-center">
        <LinearBorderContainer>
          {showEmailLogin ? (
            <form onSubmit={handleSubmit} className="bg-background-tertiary relative w-[600px]">
              <div className="p-10">
                <div className="mb-8">
                  <h1 className="text-text mb-2 text-3xl font-bold">Login</h1>
                  <p className="text-text-secondary text-sm">Enter your credentials to access the dashboard</p>
                </div>

                {error && (
                  <m.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={Spring.presets.snappy}
                    className="border-red/60 bg-red/10 mb-6 rounded-lg border px-4 py-3.5"
                  >
                    <div className="flex items-start gap-3">
                      <i className="i-lucide-circle-alert text-red mt-0.5 text-base" />
                      <p className="text-red flex-1 text-sm">{error}</p>
                    </div>
                  </m.div>
                )}

                <div className="mb-5 space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={handleEmailChange}
                    disabled={isLoading}
                    error={!!error}
                    autoComplete="email"
                    autoFocus
                  />
                </div>

                <div className="mb-6 space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                    disabled={isLoading}
                    error={!!error}
                    autoComplete="current-password"
                  />
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full"
                  disabled={!email.trim() || !password.trim()}
                  isLoading={isLoading}
                  loadingText="Signing in..."
                >
                  Sign In
                </Button>

                <div className="relative my-8">
                  <div className="absolute inset-0 flex items-center">
                    <div className="via-text/20 h-[0.5px] w-full bg-linear-to-r from-transparent to-transparent" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background-tertiary text-text-tertiary px-3 tracking-wide">
                      Or continue with
                    </span>
                  </div>
                </div>

                <SocialAuthButtons layout="row" title="" />
              </div>
            </form>
          ) : (
            <div className="bg-background-tertiary relative w-[600px]">
              <div className="space-y-8 p-10">
                <div>
                  <h1 className="text-text mb-2 text-3xl font-bold">Continue with your provider</h1>
                  <p className="text-text-secondary text-sm">
                    This workspace uses your organization&apos;s identity provider for authentication. Choose a provider
                    below to sign in.
                  </p>
                </div>
                <SocialAuthButtons layout="row" title="" />
                <p className="text-text-tertiary text-xs">
                  Need to access the root administrator account? Use the dashboard base domain to sign in with email and
                  password.
                </p>
              </div>
            </div>
          )}
        </LinearBorderContainer>
      </div>
    </div>
  )
}
