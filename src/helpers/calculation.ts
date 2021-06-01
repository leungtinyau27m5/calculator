export const lastIsNumber = (val: string): boolean => {
  if (val === '') return false
  return val.match(/\d+$/g) ? true : false
}
export const lastIsOperator = (val: string): boolean => {
  if (val === '') return false
  return val.match(/[*\-+/]\s$/) ? true : false
}
export const lastIsCloseBucket = (val: string): boolean => {
  return val.match(/\)\s$/) ? true : false
}

const loopBucket = (a: Array<string>): Array<string> => {
  const value = a.map((f) => {
    const v = reduceArr(f.replace('( ', '').replace(' )', '').split(' '))
    return v[0]
  })
  return value
}
const reduceArr = (a: Array<string>): Array<string> => {
  if (a.includes('/')) {
    const idx = a.findIndex((ele) => ele === '/')
    const first = Number(a[idx - 1])
    const second = Number(a[idx + 1])
    if (second === 0) {
      a[idx - 1] = '0'
    } else {
      const temp = first % second !== 0 ? first / second : first / second
      a[idx - 1] = temp.toString()
    }
    a.splice(idx, 2)
  }
  if (a.includes('*')) {
    const idx = a.findIndex((ele) => ele === '*')
    const first = Number(a[idx - 1])
    const second = Number(a[idx + 1])
    const temp = first * second
    a[idx - 1] = temp.toString()
    a.splice(idx, 2)
  }
  if (a.includes('+')) {
    const idx = a.findIndex((ele) => ele === '+')
    const first = Number(a[idx - 1])
    const second = Number(a[idx + 1])
    const temp = first + second
    a[idx - 1] = temp.toString()
    a.splice(idx, 2)
  }
  if (a.includes('-')) {
    const idx = a.findIndex((ele) => ele === '-')
    const first = Number(a[idx - 1])
    const second = Number(a[idx + 1])
    const temp = first - second
    a[idx - 1] = temp.toString()
    a.splice(idx, 2)
  }
  return a.length === 1 ? a : reduceArr(a)
}

export const calculation = (formular: string): string => {
  const arr = formular.split(' ')
  if (arr[0] === '') arr.shift()
  if (arr[arr.length - 1] === '') arr.pop()
  if (formular.includes('(')) {
    const hasBucket = formular.match(/\([^\(\)]*\)/g)
    const newValue = loopBucket(hasBucket)
    hasBucket.forEach((f, index) => {
      formular = formular.replace(f, newValue[index])
    })
    return calculation(formular)
  }
  return reduceArr(arr)[0]
}
