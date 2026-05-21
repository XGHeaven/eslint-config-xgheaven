import path from 'path'

const promise = new Promise((resolve, reject) => {
  if (!path) {
    reject(new Error('path missing'))
    return
  }
  resolve()
})
  .then(() => {})
  .catch((error) => {
    console.log(error)
  })
  .finally(() => {})

void promise

const blockSpacing = () => {
  console.log('block-spacing')
}

if (typeof blockSpacing === 'function') {
  console.log('block-spacing is a function')
} else {
  console.log('block-spacing is not a function')
}

const camelcase = () => {
  const camelCase = {
    isCamelcase() {
      return true
    },
  }

  return camelCase.isCamelcase()
}

camelcase()

console.log({ noMoreComma: 'ba' })
console.log({
  comma: true,
  multiline: true,
  singleArray: ['a', 'b', 'c'],
  multiArray: [1, 2, 3],
})

const Generators = function* () {
  yield 'hahaha'
}
Generators()

const readFile = (error, callback) => {
  if (error) {
    return callback(error)
  }

  return undefined
}

if (path) {
  const b = 6
  console.log(b)
}

let value = 0

switch (value) {
  case 0:
    value += 1
    break
  default:
    break
}

const Iron = () => null

export { Iron, readFile }
