# eslint-config-xgheaven

Flat ESLint 9/10 shareable config (CommonJS). Composable presets: base, TypeScript, React.

```bash
npm install @xgheaven/eslint-config-xgheaven eslint prettier
# or: pnpm add @xgheaven/eslint-config-xgheaven eslint prettier
```

Requires Node.js `>=20` and ESLint `^9` or `^10`.

## Presets

| Export | Description |
|--------|-------------|
| `@xgheaven/eslint-config-xgheaven` | Base (JS + Node + browser globals, import/n/promise, Prettier) |
| `@xgheaven/eslint-config-xgheaven/base` | Alias of base |
| `@xgheaven/eslint-config-xgheaven/typescript` | TypeScript (`typescript-eslint` recommended) |
| `@xgheaven/eslint-config-xgheaven/react` | React + React Hooks (JSX/TSX files) |
| `@xgheaven/eslint-config-xgheaven/all` | Base + TypeScript + React (convenience; pulls all plugins) |
| `@xgheaven/eslint-config-xgheaven/prettier-options` | Shared Prettier options object |

## Usage

### Base (JavaScript)

```js
// eslint.config.js
const xg = require('@xgheaven/eslint-config-xgheaven')

module.exports = [
  ...xg,
  {
    ignores: ['dist/**', 'coverage/**'],
  },
]
```

### TypeScript

```js
const xg = require('@xgheaven/eslint-config-xgheaven')
const ts = require('@xgheaven/eslint-config-xgheaven/typescript')

module.exports = [...xg, ...ts]
```

### React (+ TypeScript)

```js
const xg = require('@xgheaven/eslint-config-xgheaven')
const ts = require('@xgheaven/eslint-config-xgheaven/typescript')
const react = require('@xgheaven/eslint-config-xgheaven/react')

module.exports = [...xg, ...ts, ...react]
```

## Migration from 0.4.x (`.eslintrc`)

**Before** (legacy):

```json
{
  "extends": [
    "@xgheaven/eslint-config-xgheaven",
    "@xgheaven/eslint-config-xgheaven/typescript",
    "@xgheaven/eslint-config-xgheaven/react"
  ]
}
```

**After** (`eslint.config.js`):

```js
const xg = require('@xgheaven/eslint-config-xgheaven')
const ts = require('@xgheaven/eslint-config-xgheaven/typescript')
const react = require('@xgheaven/eslint-config-xgheaven/react')

module.exports = [...xg, ...ts, ...react]
```

Breaking changes in `0.5.0`:

- Flat config only; no `.eslintrc` / `extends` entrypoints.
- ESLint 8 unsupported; `eslint-config-standard` removed.
- `default.js` removed; use package root or `./base`.
- Node `>=20` required.

## Development

```bash
pnpm install
pnpm test
```

Playground fixtures live under `playground/{base,typescript,react}/`.
