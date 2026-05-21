'use strict'

const assert = require('node:assert/strict')
const path = require('node:path')

const pkgRoot = path.join(__dirname, '..')
const pkgName = require(path.join(pkgRoot, 'package.json')).name

const loadExport = (subpath) => {
  const resolved = subpath ? require.resolve(`${pkgName}/${subpath}`) : require.resolve(pkgName)
  const mod = require(resolved)
  assert.ok(Array.isArray(mod), `${subpath || '.'} must export a flat config array`)
  assert.ok(mod.length > 0, `${subpath || '.'} must not be empty`)
  return mod
}

loadExport('')
loadExport('base')
loadExport('typescript')
loadExport('react')
loadExport('all')

const prettierOptions = require(`${pkgName}/prettier-options`)
assert.equal(typeof prettierOptions, 'object')
assert.equal(prettierOptions.semi, false)

console.log('package exports: ok')
