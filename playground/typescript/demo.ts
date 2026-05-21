const greet = (name: string): string => {
  return 'hello ' + name
}

export { greet }

export const unusedOk = 1

void Promise.resolve().then((resolve) => {
  resolve?.(null)
})
