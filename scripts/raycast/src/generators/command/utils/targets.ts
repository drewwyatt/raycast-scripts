import type { ProjectConfiguration } from '@nx/devkit'

const targets = (name: string): ProjectConfiguration['targets'] => ({
  build: {
    executor: '@nx/esbuild:esbuild',
    outputs: ['{options.outputPath}'],
    options: {
      project: `packages/${name}/package.json`,
      outputPath: `dist/packages/${name}`,
      entryFile: `packages/${name}/src/index.ts`,
      tsConfig: 'tsconfig.json',
      main: `packages/${name}/src/index.ts`,
    },
  },
  export: {
    executor: 'raycast:export',
    dependsOn: ['build'],
    options: {
      command: `${name}`,
    },
  },
})

export default targets
