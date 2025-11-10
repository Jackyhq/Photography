const VALUE_TYPE_NULL = 'null'
const VALUE_TYPE_ARRAY = 'array'
const VALUE_TYPE_OBJECT = 'object'

function getType(value: unknown): string {
  if (value === null) {
    return VALUE_TYPE_NULL
  }
  if (Array.isArray(value)) {
    return VALUE_TYPE_ARRAY
  }
  if (typeof value === 'object') {
    return VALUE_TYPE_OBJECT
  }
  return typeof value
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (getType(value) !== VALUE_TYPE_OBJECT) {
    return false
  }
  const proto = Object.getPrototypeOf(value)
  return proto === Object.prototype || proto === null
}

function normalizeValue(value: unknown): unknown {
  const type = getType(value)

  switch (type) {
    case VALUE_TYPE_NULL: {
      return null
    }
    case VALUE_TYPE_ARRAY: {
      return (value as unknown[]).map((item) => normalizeValue(item))
    }
    case VALUE_TYPE_OBJECT: {
      if (!isPlainObject(value)) {
        return value
      }

      const entries = Object.entries(value as Record<string, unknown>)
        .map(([key, val]) => [key, normalizeValue(val)] as const)
        .filter(([, val]) => val !== undefined)
        .sort(([a], [b]) => a.localeCompare(b, 'en'))

      return entries.reduce<Record<string, unknown>>((acc, [key, val]) => {
        acc[key] = val
        return acc
      }, {})
    }
    default: {
      return value
    }
  }
}

export function stableSerialize(value: unknown, space?: number): string {
  const normalized = normalizeValue(value)
  return JSON.stringify(normalized, null, space)
}

export function isRecord(value: unknown): value is Record<string, unknown> {
  return isPlainObject(value)
}
