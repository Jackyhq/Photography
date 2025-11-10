import type { ResetCliOptions } from './reset-superadmin'
import { handleResetSuperAdminPassword, parseResetCliArgs } from './reset-superadmin'

type CliCommand<TOptions> = {
  name: string
  parse: (argv: readonly string[]) => TOptions | null
  execute: (options: TOptions) => Promise<void>
  onError?: (error: unknown) => void
}

const cliCommands: Array<CliCommand<unknown>> = [
  {
    name: 'reset-superadmin-password',
    parse: parseResetCliArgs,
    execute: (options) => handleResetSuperAdminPassword(options as ResetCliOptions),
    onError: (error) => {
      console.error('Superadmin password reset failed', error)
    },
  },
]

export async function runCliPipeline(argv: readonly string[]): Promise<boolean> {
  for (const command of cliCommands) {
    const parsedOptions = command.parse(argv)
    if (!parsedOptions) {
      continue
    }

    try {
      await command.execute(parsedOptions)
    } catch (error) {
      command.onError?.(error)
      // eslint-disable-next-line unicorn/no-process-exit
      process.exit(1)
      return true
    }

    return true
  }

  return false
}
