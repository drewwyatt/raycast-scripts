import type { ExecutorContext } from '@nx/devkit'
import * as fs from 'fs'
import * as path from 'path'
import { promisify } from 'util'
import * as z from 'zod'

const readFile = promisify(fs.readFile)

const Paths = {
  intermediateFiles: (context: ExecutorContext, ...args: string[]) =>
    path.join(context.root, 'tmp/commands/', ...args),

  commands: (context: ExecutorContext, ...args: string[]) =>
    path.join(context.root, 'commands/', ...args),
}

const commandPackageJson = z.object({
  raycast: z.object({
    schemaVersion: z.number(),
    title: z.string(),
    mode: z.string(),
    icon: z.string(),
    author: z.string(),
    authorURL: z.string(),
  }),
})

type CommandPackageJson = z.TypeOf<typeof commandPackageJson>

type CommandContents = [script: string, packageJson: CommandPackageJson]
export const readScriptAndPackage = async (
  context: ExecutorContext,
  command: string,
): Promise<CommandContents> => {
  const [script, rawPackageJson] = await Promise.all([
    readFile(Paths.intermediateFiles(context, command, 'index.js'), 'utf-8'),
    readFile(Paths.intermediateFiles(context, command, 'package.json'), 'utf-8'),
  ])

  const parsedJson = commandPackageJson.parse(JSON.parse(rawPackageJson))

  return [script, parsedJson] as CommandContents
}

export const writeScript = (
  context: ExecutorContext,
  command: string,
  script: string,
  packageJson: CommandPackageJson,
) => {
  const prefixLines = Object.entries(packageJson.raycast).reduce<string[]>(
    (acc, [key, value]) => {
      acc.push(`// @raycase.${key}: ${value}`)
      return acc
    },
    ['#!/usr/bin/env node'],
  )

  fs.writeFileSync(
    Paths.commands(context, `${command}.mjs`),
    prefixLines.concat(script).join('\n'),
    {
      encoding: 'utf-8',
      mode: 0x777,
    },
  )
}
