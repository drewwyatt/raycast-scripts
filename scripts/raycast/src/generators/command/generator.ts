import { Tree, formatFiles, installPackagesTask } from '@nx/devkit'
import { libraryGenerator } from '@nx/js'

export default async function (tree: Tree, schema: any) {
  await libraryGenerator(tree, { name: schema.name })
  await formatFiles(tree)
  return () => {
    installPackagesTask(tree)
  }
}
