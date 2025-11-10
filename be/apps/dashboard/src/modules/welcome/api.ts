import { coreApi } from '~/lib/api-client'

export async function getWelcomeSiteSchema() {
  return await coreApi('/public/site-settings/welcome-schema', {
    method: 'GET',
  })
}
