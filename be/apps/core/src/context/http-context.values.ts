import type { Session } from 'better-auth'
import type { AuthSession } from 'core/modules/platform/auth/auth.provider'
import type { TenantContext } from 'core/modules/platform/tenant/tenant.types'

export interface HttpContextAuth {
  user?: AuthSession['user']
  session?: Session
}
declare module '@afilmory/framework' {
  interface HttpContextValues {
    tenant?: TenantContext
    auth?: HttpContextAuth
  }
}
