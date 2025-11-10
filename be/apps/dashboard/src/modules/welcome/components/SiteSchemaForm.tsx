import { useMemo } from 'react'

import { SchemaFormRendererUncontrolled } from '~/modules/schema-form/SchemaFormRenderer'
import type { SchemaFormState, SchemaFormValue, UiFieldNode, UiSchema } from '~/modules/schema-form/types'

type SiteSchemaFormProps<Key extends string> = {
  schema: UiSchema<Key>
  values: SchemaFormState<Key>
  errors: Record<string, string>
  onFieldChange: (key: Key, value: string | boolean) => void
}

export const SiteSchemaForm = <Key extends string>({
  schema,
  values,
  errors,
  onFieldChange,
}: SiteSchemaFormProps<Key>) => {
  const schemaWithErrors = useMemo(() => {
    const enhanceNode = (node: UiFieldNode<Key>): UiFieldNode<Key> => {
      const error = errors[node.key]
      if (!error) {
        return node
      }
      return {
        ...node,
        helperText: error,
      }
    }

    return {
      ...schema,
      sections: schema.sections.map((section) => ({
        ...section,
        children: section.children.map((child: UiFieldNode<Key> | any) => {
          if (child.type !== 'field') {
            return child
          }
          return enhanceNode(child)
        }),
      })),
    }
  }, [errors, schema])

  return (
    <div className="space-y-6">
      <SchemaFormRendererUncontrolled
        initialValues={values}
        schema={schemaWithErrors}
        onChange={(key: Key, value: SchemaFormValue) => {
          onFieldChange(key, typeof value === 'boolean' ? value : value == null ? '' : String(value))
        }}
      />
    </div>
  )
}
