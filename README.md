# eslint-config-xgheaven

Flat ESLint 9 shareable config factory (CommonJS) based on the Standard JavaScript style, tuned by XGHeaven for personal usage preferences.

```bash
npm install @xgheaven/eslint-config-xgheaven eslint prettier
# or: pnpm add @xgheaven/eslint-config-xgheaven eslint prettier
```

Requires Node.js `>=20.19` and ESLint `^9`.

## Usage

### Base (JavaScript)

```js
// eslint.config.js
const config = require('@xgheaven/eslint-config-xgheaven')

module.exports = config({
  ignores: ['dist/**', 'coverage/**'],
})
```

### TypeScript

```js
const config = require('@xgheaven/eslint-config-xgheaven')

module.exports = config({ ts: true })
```

### React (+ TypeScript)

```js
const config = require('@xgheaven/eslint-config-xgheaven')

module.exports = config({ ts: true, react: true })
```

The root export accepts `neostandard` options and adds:

- `ts` / `typescript`: include TypeScript rules
- `react`: include React and React Hooks rules

`resolveIgnoresFromGitignore` is re-exported on the function:

```js
const config = require('@xgheaven/eslint-config-xgheaven')

module.exports = config({
  ignores: config.resolveIgnoresFromGitignore(),
})
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
const config = require('@xgheaven/eslint-config-xgheaven')

module.exports = config({ ts: true, react: true })
```

Breaking changes in `0.5.0`:

- Flat config only; no `.eslintrc` / `extends` entrypoints.
- Package root exports a config function; config subpath exports were removed.
- ESLint 8 unsupported; `eslint-config-standard` removed.
- `default.js` removed; use the package root.
- Node `>=20.19` required.

## Development

```bash
pnpm install
pnpm test
```

Playground fixtures:

- `playground/base/`: validates the base JavaScript config
- `playground/typescript/`: validates `config({ ts: true })`
- `playground/react/`: validates `config({ ts: true, react: true })`
