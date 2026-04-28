import { createBrowserRouter } from 'react-router'

import App from './App'
import { ErrorElement } from './components/common/ErrorElement'
import { NotFound } from './components/common/NotFound'
import { buildGlobRoutes } from './lib/route-builder'

export function createAppRouter(globTree: Record<string, () => Promise<any>>) {
  const tree = buildGlobRoutes(globTree)

  return createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: tree,
      errorElement: <ErrorElement />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ])
}
