/** Convenience: base + TypeScript + React (pulls all plugin dependencies). */
const xgheaven = require('./index') as typeof import('./index')

export = xgheaven({ ts: true, react: true })
