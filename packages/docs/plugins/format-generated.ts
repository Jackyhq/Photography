import { format, resolveConfig } from 'prettier'

export async function formatGeneratedTypescript(source: string, outputPath: string): Promise<string> {
  const config = (await resolveConfig(outputPath)) ?? {}
  return format(source, { ...config, filepath: outputPath })
}
