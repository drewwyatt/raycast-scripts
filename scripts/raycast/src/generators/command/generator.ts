import { addProjectConfiguration, formatFiles, generateFiles, Tree } from '@nx/devkit'
import * as path from 'path'
import { CommandGeneratorSchema } from './schema'
import { targets } from './utils'

export async function commandGenerator(tree: Tree, options: CommandGeneratorSchema) {
  const projectRoot = `packages/${options.name}`
  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: 'library',
    sourceRoot: `${projectRoot}/src`,
    targets: targets(options.name),
  })
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options)
  await formatFiles(tree)
}

export default commandGenerator
