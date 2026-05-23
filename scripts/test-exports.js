'use strict'

const assert = require('node:assert/strict')
const path = require('node:path')

const pkgRoot = path.join(__dirname, '..')
const pkgName = require(path.join(pkgRoot, 'package.json')).name

const mod = require(require.resolve(pkgName))
assert.equal(typeof mod, 'function', '. must export a config function')
assert.equal(typeof mod.resolveIgnoresFromGitignore, 'function')

const baseConfig = mod()
assert.ok(Array.isArray(baseConfig), 'config function must return a flat config array')
assert.ok(baseConfig.length > 0, 'config function result must not be empty')

assert.ok(Array.isArray(mod({ ts: true })))
assert.ok(Array.isArray(mod({ react: true })))
assert.ok(Array.isArray(mod({ ts: true, react: true })))
assert.ok(Array.isArray(mod({ ignores: ['dist/**'] })))

assert.doesNotThrow(() => require(`${pkgName}/package.json`))
assert.throws(() => require(`${pkgName}/typescript`), /Package subpath/)
assert.throws(() => require(`${pkgName}/react`), /Package subpath/)
assert.throws(() => require(`${pkgName}/all`), /Package subpath/)

console.log('package exports: ok')
