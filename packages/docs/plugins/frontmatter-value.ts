// The docs frontmatter format uses single-line scalar values.
export function parseFrontmatterValue(source: string): string {
  const value = source.trim()
  if (value.length < 2) return value
  if (value.startsWith("'") && value.endsWith("'")) {
    return value.slice(1, -1).replaceAll("''", "'")
  }
  if (value.startsWith('"') && value.endsWith('"')) {
    try {
      const parsed: unknown = JSON.parse(value)
      if (typeof parsed === 'string') return parsed
    } catch {
      // Preserve existing single-line values that do not use JSON-style escapes.
    }
    return value.slice(1, -1)
  }
  return value
}
