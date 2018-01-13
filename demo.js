import path from 'path'

const _promise = new Promise((resolve, reject) => {
  resolve()
}).then(() => {
  return
}).catch(e => {
  // TODO: Do something
  console.log(e)
}).finally(() => {
})

// block-spacing
const blockSpacing = () => { console.log('block-spacing') }

// brace-style
if (typeof blockSpacing === 'function') {
  console.log('block-spacing is a function')
} else {
  console.log('block-spacing is not a function')
}

function camelcase () {
  const camelCase = {
    isCamelcase () {
      return true
    },
  }

  return camelCase.isCamelcase()
}

camelcase()

console.log({noMoreComma: 'ba'})
console.log({
  comma: true,
  multiline: true,
  singleArray: ['a', 'b', 'c'],
  multiArray: [
    1,
    2,
    3,
  ],
})

function *Generators () {
  yield 'hahaha'
}
Generators()

function readFile (e, callback) {
  if (e) {
    return callback(e)
  }
}

if (path) {
  let b = 6
  console.log(b)
}

let value = 0

switch (value) {
case 0:
  value++
  break
}

export function Iron () {

}

export {
  readFile,
}
