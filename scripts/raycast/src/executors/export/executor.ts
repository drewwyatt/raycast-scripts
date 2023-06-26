import type { ExecutorContext } from '@nx/devkit'
import { readScriptAndPackage, writeScript } from './utils'

export type ExportExecutorOptions = {
  command: string
}

export default async function exportExecutor(
  options: ExportExecutorOptions,
  context: ExecutorContext,
): Promise<{ success: boolean }> {
  let success = false

  try {
    const [script, packageJson] = await readScriptAndPackage(context, options.command)
    writeScript(context, options.command, script, packageJson)
    success = true
  } catch (err) {
    console.error(err)
  }

  return { success }
}
