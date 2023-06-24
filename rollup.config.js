const path = require('path')
const commonjs = require('@rollup/plugin-commonjs')
const resolve = require('@rollup/plugin-node-resolve')
const typescript = require('@rollup/plugin-typescript')

const Paths = {
  root: (...args) => path.join(__dirname, ...args),
  commands: (...args) => path.join(__dirname, 'commands', ...args),
  packageDir: (...args) =>
    path.join(__dirname, `packages/${process.env.PACKAGE_DIR}`, ...args),
}

const pkg = require(Paths.packageDir('package.json'))

const outFile = !!process.env.OUT_FILE
  ? Paths.root(process.env.OUT_FILE)
  : `${Paths.commands(pkg.name)}.js`

const banner = 'raycast' in pkg ? '#!/usr/bin/env node' : undefined

module.exports = {
  input: `${Paths.packageDir(pkg.main)}`,
  output: {
    file: outFile,

    banner,
    format: 'cjs',
  },
  plugins: [commonjs(), resolve(), typescript()],
}
