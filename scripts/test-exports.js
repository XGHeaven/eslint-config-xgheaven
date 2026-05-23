'use strict'

const assert = require('node:assert/strict')
const path = require('node:path')

const pkgRoot = path.join(__dirname, '..')
const pkgName = require(path.join(pkgRoot, 'package.json')).name

const loadConfigArrayExport = (subpath) => {
  const resolved = subpath ? require.resolve(`${pkgName}/${subpath}`) : require.resolve(pkgName)
  const mod = require(resolved)
  assert.ok(Array.isArray(mod), `${subpath || '.'} must export a flat config array`)
  assert.ok(mod.length > 0, `${subpath || '.'} must not be empty`)
  return mod
}

const loadConfigFunctionExport = (subpath) => {
  const resolved = subpath ? require.resolve(`${pkgName}/${subpath}`) : require.resolve(pkgName)
  const mod = require(resolved)
  assert.equal(typeof mod, 'function', `${subpath || '.'} must export a config function`)
  assert.equal(typeof mod.resolveIgnoresFromGitignore, 'function')
  const config = mod()
  assert.ok(Array.isArray(config), `${subpath || '.'} function must return a flat config array`)
  assert.ok(config.length > 0, `${subpath || '.'} function result must not be empty`)
  assert.ok(Array.isArray(mod({ ts: true, react: true })))
  return mod
}

loadConfigFunctionExport('')
loadConfigFunctionExport('base')
loadConfigArrayExport('typescript')
loadConfigArrayExport('react')
loadConfigArrayExport('all')

const prettierOptions = require(`${pkgName}/prettier-options`)
assert.equal(typeof prettierOptions, 'object')
assert.equal(prettierOptions.semi, false)

console.log('package exports: ok')
