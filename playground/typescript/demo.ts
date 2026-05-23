const greet = (name: string): string => {
  return 'hello ' + name
}

export { greet }

export const unusedOk = 1

Promise.resolve()
  .then(() => {
    console.log('resolved')
  })
  .catch(console.error)
