import type { RouteConfig } from '../routes'
import routes from '../routes'
import { normalizeDocsPath } from '../site'

export const getMatchedRoute = (currentPath: string): RouteConfig | undefined => {
  return routes.find((route) => {
    return normalizeDocsPath(route.path) === normalizeDocsPath(currentPath)
  })
}
