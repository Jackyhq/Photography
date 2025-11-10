import type { FC } from 'react'

import type {
  TenantRegistrationFormState,
  TenantSiteFieldKey,
  useRegistrationForm,
} from '~/modules/auth/hooks/useRegistrationForm'
import type { SchemaFormState, UiSchema } from '~/modules/schema-form/types'
import { SiteSchemaForm } from '~/modules/welcome/components/SiteSchemaForm'

type SiteSettingsStepProps = {
  form: ReturnType<typeof useRegistrationForm>
  schema: UiSchema<TenantSiteFieldKey> | null
  isLoading: boolean
  errorMessage?: string
  values: TenantRegistrationFormState
  errors: Record<string, string>
  onFieldInteraction: () => void
}

export const SiteSettingsStep: FC<SiteSettingsStepProps> = ({
  form,
  schema,
  isLoading,
  errorMessage,
  values,
  errors,
}) => {
  if (!schema) {
    if (isLoading) {
      return (
        <div className="space-y-8">
          <section className="space-y-3">
            <h2 className="text-text text-lg font-semibold">Site branding</h2>
            <p className="text-text-secondary text-sm">
              These details appear on your public gallery, metadata, and social sharing cards. You can change them later
              from the dashboard.
            </p>
          </section>
          <div className="bg-fill/40 h-56 animate-pulse rounded-2xl border border-white/5" />
        </div>
      )
    }

    return (
      <div className="space-y-6">
        <section className="space-y-3">
          <h2 className="text-text text-lg font-semibold">Site branding</h2>
          <p className="text-text-secondary text-sm">
            We couldn&apos;t load the site configuration schema from the server. Refresh the page or contact support.
          </p>
        </section>
        {errorMessage && (
          <div className="border-red/50 bg-red/10 text-red rounded-xl border px-4 py-3 text-sm">{errorMessage}</div>
        )}
      </div>
    )
  }

  return (
    <div className="-mx-6 -mt-12 space-y-8">
      {errorMessage && (
        <div className="border-red/50 bg-red/10 text-red rounded-xl border px-4 py-3 text-sm">{errorMessage}</div>
      )}
      <SiteSchemaForm
        schema={schema}
        values={values as SchemaFormState<TenantSiteFieldKey>}
        errors={errors}
        onFieldChange={(key, value) => {
          form.state.values[key] = value
        }}
      />
    </div>
  )
}
