/** Serialize JSON for an inline HTML script element without allowing the data to close the script context. */
export function serializeForInlineScript(value: unknown): string {
  const serialized = JSON.stringify(value)
  if (serialized === undefined) {
    throw new TypeError('Inline script payload must be JSON serializable')
  }

  return serialized
    .replaceAll('<', '\\u003C')
    .replaceAll('>', '\\u003E')
    .replaceAll('&', '\\u0026')
    .replaceAll('\u2028', '\\u2028')
    .replaceAll('\u2029', '\\u2029')
}
