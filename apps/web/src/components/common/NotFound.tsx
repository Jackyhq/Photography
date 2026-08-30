import { useLocation, useNavigate } from 'react-router'

import { FallbackButton } from './FallbackButton'

export const NotFound = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-5 px-6 text-center">
      <div className="space-y-2">
        <h1 className="text-text text-2xl font-semibold">Page not found</h1>
        <p className="text-text-secondary">You have come to a desert of knowledge where there is nothing.</p>
      </div>
      <code className="bg-material-medium border-fill-tertiary max-w-full rounded-lg border px-3 py-2 text-sm break-all">
        {location.pathname}
      </code>
      <FallbackButton onClick={() => navigate('/')}>Back to Home</FallbackButton>
    </main>
  )
}
