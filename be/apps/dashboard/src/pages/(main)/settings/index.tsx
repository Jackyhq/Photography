import { redirect } from 'react-router'

export function Component() {
  return null
}

export const loader = () => redirect('/settings/site')
