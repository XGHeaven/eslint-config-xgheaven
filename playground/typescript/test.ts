export type F<T> = T extends any ? true : false
export const a = 1

export function b(...args: any[]) {
  console.log(...args)
}

export function c() {
  return ''
}
