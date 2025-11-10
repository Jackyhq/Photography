import type { SchemaFormState, SchemaFormValue, UiFieldNode, UiNode, UiSchema } from '~/modules/schema-form/types'

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replaceAll(/[^a-z0-9-]+/g, '-')
    .replaceAll(/-{2,}/g, '-')
    .replaceAll(/^-+|-+$/g, '')
}

const traverseSchemaNodes = <Key extends string>(
  nodes: ReadonlyArray<UiNode<Key>>,
  map: Map<Key, UiFieldNode<Key>>,
) => {
  for (const node of nodes) {
    if (node.type === 'field') {
      map.set(node.key, node)
      continue
    }

    traverseSchemaNodes(node.children, map)
  }
}

export function collectSchemaFieldMap<Key extends string>(schema: UiSchema<Key>): Map<Key, UiFieldNode<Key>> {
  const map = new Map<Key, UiFieldNode<Key>>()
  traverseSchemaNodes(schema.sections, map)
  return map
}

export function createInitialSiteStateFromFieldMap<Key extends string>(
  fieldMap: Map<Key, UiFieldNode<Key>>,
  defaults: Record<string, SchemaFormValue | undefined>,
): SchemaFormState<Key> {
  const state = {} as SchemaFormState<Key>
  for (const [key, field] of fieldMap) {
    const defaultValue = defaults[key as string]
    if (defaultValue !== undefined) {
      state[key] = defaultValue
      continue
    }

    if (field.component.type === 'switch') {
      state[key] = false
      continue
    }

    state[key] = ''
  }
  return state
}

export function coerceSiteFieldValue<Key extends string>(
  field: UiFieldNode<Key>,
  raw: unknown,
): SchemaFormValue | undefined {
  if (raw == null) {
    return undefined
  }

  if (field.component.type === 'switch') {
    if (typeof raw === 'boolean') {
      return raw
    }
    if (typeof raw === 'string') {
      return raw.toLowerCase() === 'true'
    }
    return Boolean(raw)
  }

  if (typeof raw === 'string') {
    return raw
  }

  if (typeof raw === 'number') {
    return String(raw)
  }

  if (typeof raw === 'boolean') {
    return raw ? 'true' : 'false'
  }

  try {
    return String(raw)
  } catch {
    return ''
  }
}

export function serializeSiteFieldValue<Key extends string>(
  field: UiFieldNode<Key>,
  value: SchemaFormValue | undefined,
): string {
  if (field.component.type === 'switch') {
    if (typeof value === 'boolean') {
      return value ? 'true' : 'false'
    }
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true' ? 'true' : 'false'
    }
    return 'false'
  }

  if (value == null) {
    return ''
  }

  if (typeof value === 'string') {
    return value.trim()
  }

  if (typeof value === 'number') {
    return String(value)
  }

  if (typeof value === 'boolean') {
    return value ? 'true' : 'false'
  }

  try {
    return String(value)
  } catch {
    return ''
  }
}
