# ESLint 9/10 Flat Config Upgrade Plan

## Goals

- Target ESLint 9 and 10 only.
- Use flat config as the only supported config format.
- Drop legacy `.eslintrc` compatibility from the next major/pre-1.0 breaking release.
- Clean up the inherited StandardJS-era rule set instead of copying it wholesale.
- Keep presets composable: base, TypeScript, React, and optional all-in-one.
- Keep CI deterministic: never mutate lockfiles in CI.

## Non-Goals

- No ESLint 8 support.
- No legacy `.eslintrc` entrypoint support in the new major.
- No `FlatCompat` unless a specific third-party config must be bridged temporarily.
- No exact StandardJS compatibility promise.

## Recommended Package Shape

Use CommonJS initially so consumers can use `require()` in `eslint.config.js` without an ESM migration. A later ESM release can be considered separately.

```text
index.js                   # flat base export
base.js                    # alias of index.js, optional
rules/base.js              # cleaned base rules
rules/prettier.js          # prettier rule wiring
typescript.js              # flat TS export
react.js                   # flat React export
all.js                     # optional convenience export: base + TS + React
prettier-options.js        # shared prettier options
```

Recommended `exports`:

```jsonc
{
  "main": "./index.js",
  "exports": {
    ".": "./index.js",
    "./base": "./base.js",
    "./typescript": "./typescript.js",
    "./react": "./react.js",
    "./all": "./all.js",
    "./prettier-options": "./prettier-options.js",
    "./package.json": "./package.json"
  },
  "files": [
    "index.js",
    "base.js",
    "typescript.js",
    "react.js",
    "all.js",
    "rules/",
    "prettier-options.js"
  ]
}
```

## Dependency Strategy

### Peer dependencies

```jsonc
{
  "peerDependencies": {
    "eslint": "^9.0.0 || ^10.0.0",
    "prettier": ">=3.0.0"
  },
  "peerDependenciesMeta": {
    "prettier": { "optional": true },
    "typescript": { "optional": true },
    "react": { "optional": true }
  },
  "engines": {
    "node": ">=20"
  }
}
```

Node `>=20` is a cleaner baseline for ESLint 9/10-era tooling. If this is too aggressive, `>=18.18` is the minimum practical fallback for ESLint 9, but the package should prefer `>=20`.

### Runtime dependencies

Prefer plug-and-play presets. Put plugins/config helpers used by exported presets in `dependencies`:

```jsonc
{
  "dependencies": {
    "@eslint/js": "^9.x",
    "eslint-config-prettier": "^10.x",
    "eslint-plugin-import": "^2.32.0",
    "eslint-plugin-n": "^18.x",
    "eslint-plugin-prettier": "^5.5.0",
    "eslint-plugin-promise": "^7.x",
    "eslint-plugin-react": "^7.37.0",
    "eslint-plugin-react-hooks": "^7.1.0",
    "globals": "^16.x",
    "typescript-eslint": "^8.x"
  }
}
```

Do not include `eslint-config-standard` or `@eslint/eslintrc`.

- `eslint-config-standard` is ESLint 8-era and legacy-config oriented.
- `@eslint/eslintrc` is only needed for `FlatCompat`, which this plan avoids.

## Rule Cleanup Strategy

Do not copy the entire `eslint-config-standard` rule table. Build an explicit, auditable rule set.

Recommended process:

1. Start from `@eslint/js.configs.recommended` for correctness rules.
2. Add useful StandardJS-like behavior rules only after review.
3. Drop deprecated, removed, duplicate, or ESLint 9/10-incompatible rules.
4. Drop rules that only duplicate Prettier formatting. Let `eslint-config-prettier` handle conflicts.
5. Keep plugin rules only when the plugin supports ESLint 9/10 and the rule ID is current.
6. Keep TypeScript-specific core-rule replacements in the TypeScript preset, not base.
7. Add fixtures that intentionally trigger representative rules.

Suggested file layout:

```text
rules/base.js
rules/import.js
rules/node.js
rules/promise.js
rules/prettier.js
```

Each rules file should group rules with comments:

- correctness/safety
- module/import
- Node.js
- promises
- style intentionally kept despite Prettier
- disabled because handled by Prettier or TypeScript

## Base Flat Config

Consumer usage:

```js
const xg = require('@xgheaven/eslint-config-xgheaven')

module.exports = [
  ...xg,
  {
    ignores: ['dist/**', 'coverage/**'],
  },
]
```

Implementation shape:

```js
const js = require('@eslint/js')
const globals = require('globals')
const importPlugin = require('eslint-plugin-import')
const nPlugin = require('eslint-plugin-n')
const promisePlugin = require('eslint-plugin-promise')
const prettierPlugin = require('eslint-plugin-prettier')
const eslintConfigPrettier = require('eslint-config-prettier/flat')
const baseRules = require('./rules/base')
const prettierOptions = require('./prettier-options')

module.exports = [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.es2024,
        ...globals.node,
        ...globals.browser,
      },
    },
    plugins: {
      import: importPlugin,
      n: nPlugin,
      promise: promisePlugin,
      prettier: prettierPlugin,
    },
    rules: baseRules,
  },
  eslintConfigPrettier,
  {
    rules: {
      'prettier/prettier': ['warn', prettierOptions],
    },
  },
]
```

Note: `eslint-config-prettier` must come before the final `prettier/prettier` block, otherwise it may disable the rule.

## TypeScript Flat Config

Consumer usage:

```js
const xg = require('@xgheaven/eslint-config-xgheaven')
const ts = require('@xgheaven/eslint-config-xgheaven/typescript')

module.exports = [
  ...xg,
  ...ts,
]
```

Implementation shape:

```js
const tseslint = require('typescript-eslint')

const tsFiles = ['**/*.{ts,tsx,mts,cts}']

module.exports = [
  ...tseslint.configs.recommended.map((config) => ({
    files: tsFiles,
    ...config,
  })),
  {
    files: tsFiles,
    rules: {
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-inferrable-types': 'off',
      'no-unused-expressions': 'off',
      'promise/param-names': 'off',
      'n/no-callback-literal': 'off',
    },
  },
]
```

Keep type-aware linting out of the default TypeScript preset. Add a later optional `typescript-type-checked` export if needed.

## React Flat Config

Consumer usage:

```js
const xg = require('@xgheaven/eslint-config-xgheaven')
const ts = require('@xgheaven/eslint-config-xgheaven/typescript')
const react = require('@xgheaven/eslint-config-xgheaven/react')

module.exports = [
  ...xg,
  ...ts,
  ...react,
]
```

Implementation shape:

```js
const reactPlugin = require('eslint-plugin-react')
const reactHooks = require('eslint-plugin-react-hooks')
const globals = require('globals')

module.exports = [
  {
    files: ['**/*.{jsx,tsx}'],
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: globals.browser,
    },
    settings: {
      react: { version: 'detect' },
    },
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...(reactHooks.configs.flat?.recommended?.rules ?? reactHooks.configs.recommended.rules),
      'react/sort-comp': [
        'error',
        {
          order: [
            'static-variables',
            'static-methods',
            'instance-variables',
            'lifecycle',
            'everything-else',
            '/^(handle|on).+$/',
            '/^render.+$/',
            'render',
          ],
        },
      ],
      'react/no-unsafe': ['error', { checkAliases: true }],
      'react/react-in-jsx-scope': 'off',
    },
  },
]
```

## All-in-One Export

`all.js` can exist for convenience:

```js
module.exports = [
  ...require('./index'),
  ...require('./typescript'),
  ...require('./react'),
]
```

Document clearly that it loads TypeScript and React plugin dependencies. Consumers who want minimal dependencies should compose only the presets they need.

## Breaking Changes

This should be a breaking release:

- Drop `.eslintrc` legacy entrypoints from the supported API.
- Drop ESLint 8 support.
- Add `exports`, which blocks undocumented deep imports.
- Rename API around flat config-first entrypoints.

Recommended version:

- `1.0.0` if formalizing the API.
- Or `0.5.0` if staying pre-1.0 but treating minor as breaking.

## Migration Guide

### Before

```jsonc
{
  "extends": [
    "@xgheaven/eslint-config-xgheaven",
    "@xgheaven/eslint-config-xgheaven/typescript",
    "@xgheaven/eslint-config-xgheaven/react"
  ]
}
```

### After

```js
// eslint.config.js
const xg = require('@xgheaven/eslint-config-xgheaven')
const ts = require('@xgheaven/eslint-config-xgheaven/typescript')
const react = require('@xgheaven/eslint-config-xgheaven/react')

module.exports = [
  ...xg,
  ...ts,
  ...react,
  {
    ignores: ['dist/**', 'coverage/**'],
  },
]
```

## Test Plan

CI should never modify `pnpm-lock.yaml`.

Use committed fixtures with their own lockfiles if we need to test multiple ESLint majors.

Recommended layout:

```text
playground/base/
playground/typescript/
playground/react/
playground/eslint10/       # optional once ESLint 10 is available/stable
```

Recommended scripts:

```jsonc
{
  "scripts": {
    "lint": "eslint .",
    "test": "pnpm run test:base && pnpm run test:typescript && pnpm run test:react",
    "test:base": "eslint -c playground/base/eslint.config.js playground/base",
    "test:typescript": "eslint -c playground/typescript/eslint.config.js playground/typescript",
    "test:react": "eslint -c playground/react/eslint.config.js playground/react"
  }
}
```

Recommended CI:

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm test

  test-eslint10:
    if: false # enable when ESLint 10 is available/stable
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm --dir playground/eslint10 install --frozen-lockfile
      - run: pnpm --dir playground/eslint10 test
```

## Implementation Steps

1. Create a new branch for the flat-only release.
2. Add `prettier-options.js`.
3. Add cleaned `rules/` modules; do not copy StandardJS wholesale.
4. Replace package entrypoints with flat config exports.
5. Update dependencies, peers, `engines.node`, `files`, and `exports`.
6. Add playground fixtures and tests.
7. Update README with migration guide.
8. Run `pnpm install`, `pnpm test`, and package smoke tests.
9. Publish as a breaking release.

## Open Questions

- Should the package be CommonJS for this release, or move directly to ESM?
  - Recommendation: CommonJS first for easier `eslint.config.js` adoption.
- Should Prettier be enforced inside ESLint?
  - Current behavior does this. Keep it for compatibility, but recommend separate `prettier --check` for large projects.
- Should `all.js` be included?
  - Useful for convenience, but document that minimal users should compose presets explicitly.
