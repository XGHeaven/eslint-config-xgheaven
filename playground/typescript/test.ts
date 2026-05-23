export type F<T> = T extends unknown ? true : false
export const a = 1

const b = (...args: unknown[]) => {
  console.log(...args)
}

const c = () => {
  return ''
}

export { b, c }
