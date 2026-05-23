import type { Linter } from 'eslint'
import type { NeostandardOptions } from 'neostandard'

const neostandard = require('neostandard') as typeof import('neostandard')
const importPlugin = require('eslint-plugin-import')
const nPlugin = require('eslint-plugin-n')
const promisePlugin = require('eslint-plugin-promise')
const prettierPlugin = require('eslint-plugin-prettier')
const eslintConfigPrettier = require('eslint-config-prettier/flat')
const prettierOptions = require('./prettier-options')

const baseRules = require('./rules/base')
const importRules = require('./rules/import')
const nodeRules = require('./rules/node')
const promiseRules = require('./rules/promise')

type ResolveIgnoresFromGitignore = typeof neostandard.resolveIgnoresFromGitignore

interface XgheavenOptions extends NeostandardOptions {
  /** Include @xgheaven TypeScript rules. `ts` is also passed through to neostandard. */
  typescript?: boolean
  /** Include React and React Hooks rules. */
  react?: boolean
}

interface Xgheaven {
  (options?: XgheavenOptions): Linter.Config[]
  resolveIgnoresFromGitignore: ResolveIgnoresFromGitignore
}

const xgheaven = ((options: XgheavenOptions = {}): Linter.Config[] => {
  const { typescript = options.ts ?? false, react = false, ...neostandardOptions } = options

  return [
    ...neostandard({
      env: ['node', 'browser'],
      noStyle: true,
      ...neostandardOptions,
    }),
    {
      plugins: {
        import: importPlugin,
        n: nPlugin,
        promise: promisePlugin,
        prettier: prettierPlugin,
      },
      rules: {
        ...baseRules,
        ...importRules,
        ...nodeRules,
        ...promiseRules,
      },
    },
    eslintConfigPrettier,
    {
      rules: {
        'prettier/prettier': ['warn', prettierOptions],
      },
    },
    ...(typescript ? require('./typescript') : []),
    ...(react ? require('./react') : []),
  ]
}) as Xgheaven

xgheaven.resolveIgnoresFromGitignore = neostandard.resolveIgnoresFromGitignore

export = xgheaven
