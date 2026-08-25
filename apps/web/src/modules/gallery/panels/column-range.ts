export const normalizeColumnCount = (value: number | 'auto', min: number, max: number): number | 'auto' =>
  value === 'auto' ? value : Math.min(max, Math.max(min, value))
