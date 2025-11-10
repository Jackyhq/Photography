import { useForm } from '@tanstack/react-form'
import { useMemo } from 'react'
import { z } from 'zod'

import type { SchemaFormState } from '~/modules/schema-form/types'
import { DEFAULT_SITE_SETTINGS_VALUES, SITE_SETTINGS_KEYS, siteSettingsSchema } from '~/modules/welcome/siteSchema'

export type TenantSiteFieldKey = (typeof SITE_SETTINGS_KEYS)[number]
type SiteFormState = SchemaFormState<TenantSiteFieldKey>

export type TenantRegistrationFormState = SiteFormState & {
  tenantName: string
  tenantSlug: string
  termsAccepted: boolean
}

const baseRegistrationSchema = z.object({
  tenantName: z.string().min(1, { error: 'Workspace name is required' }),
  tenantSlug: z
    .string()
    .min(1, { error: 'Slug is required' })
    .regex(/^[a-z0-9-]+$/, { error: 'Use lowercase letters, numbers, and hyphen only' }),
  termsAccepted: z.boolean({
    error: 'You must accept the terms to continue',
  }),
})

export const tenantRegistrationSchema = siteSettingsSchema.merge(baseRegistrationSchema)

export function buildRegistrationInitialValues(
  initial?: Partial<TenantRegistrationFormState>,
): TenantRegistrationFormState {
  const siteValues: SiteFormState = { ...DEFAULT_SITE_SETTINGS_VALUES }

  if (initial) {
    for (const key of SITE_SETTINGS_KEYS) {
      const value = initial[key]
      if (value === undefined || value === null) {
        continue
      }

      if (typeof value === 'boolean' || typeof value === 'string' || typeof value === 'number') {
        siteValues[key] = value
      }
    }
  }

  return {
    tenantName: initial?.tenantName ?? '',
    tenantSlug: initial?.tenantSlug ?? '',
    termsAccepted: initial?.termsAccepted ?? false,
    ...siteValues,
  }
}

export function validateRegistrationValues(values: TenantRegistrationFormState): Record<string, string> {
  const result = tenantRegistrationSchema.safeParse(values)

  if (result.success) {
    return {}
  }

  const fieldErrors: Record<string, string> = {}

  for (const issue of result.error.issues) {
    const path = issue.path.join('.')

    if (!path || fieldErrors[path]) {
      continue
    }

    fieldErrors[path] = issue.message
  }

  return fieldErrors
}

export function useRegistrationForm(initial?: Partial<TenantRegistrationFormState>) {
  const defaultValues = useMemo(() => buildRegistrationInitialValues(initial), [initial])

  return useForm({
    defaultValues,
    validators: {
      onChange: ({ value }) => {
        const fieldErrors = validateRegistrationValues(value)
        return Object.keys(fieldErrors).length > 0 ? { fields: fieldErrors } : undefined
      },
      onSubmit: ({ value }) => {
        const fieldErrors = validateRegistrationValues(value)
        return Object.keys(fieldErrors).length > 0 ? { fields: fieldErrors } : undefined
      },
    },
  })
}
