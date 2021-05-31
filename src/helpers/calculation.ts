const loopBucket = (a: Array<string>): Array<string> => {
  const value = a.map(f => {
    const v = reduceArr(f.replace("( ", "").replace(" )", "").split(" "))
    return v[0]
  })
  return value
}
const reduceArr = (a: Array<string>): Array<string> => {
  if (a.includes("/")) {
    let idx = a.findIndex((ele) => ele === "/");
    let first = Number(a[idx - 1]);
    let second = Number(a[idx + 1]);
    if (second === 0) {
      a[idx - 1] = "0";
    } else {
      const temp = first % second !== 0 ? first / second : first / second;
      a[idx - 1] = temp.toString();
    }
    a.splice(idx, 2);
  }
  if (a.includes("*")) {
    let idx = a.findIndex((ele) => ele === "*");
    let first = Number(a[idx - 1]);
    let second = Number(a[idx + 1]);
    const temp = first * second;
    a[idx - 1] = temp.toString();
    a.splice(idx, 2);
  }
  if (a.includes("+")) {
    let idx = a.findIndex((ele) => ele === "+");
    let first = Number(a[idx - 1]);
    let second = Number(a[idx + 1]);
    const temp = first + second;
    a[idx - 1] = temp.toString();
    a.splice(idx, 2);
  }
  if (a.includes("-")) {
    let idx = a.findIndex((ele) => ele === "-");
    let first = Number(a[idx - 1]);
    let second = Number(a[idx + 1]);
    const temp = first - second;
    a[idx - 1] = temp.toString();
    a.splice(idx, 2);
  }
  return a.length === 1 ? a : reduceArr(a);
};

export const calculation = (formular: string): string => {
  let arr = formular.split(" ");
  if (arr[0] === "") arr.shift()
  if (arr[arr.length -1] === "") arr.pop();
  if (formular.includes("(")) {
    let hasBucket = formular.match(/\([^\(\)]*\)/g);
    const newValue = loopBucket(hasBucket)
    hasBucket.forEach((f, index) => {
      formular = formular.replace(f, newValue[index])
    })
    return calculation(formular)
  }
  return reduceArr(arr)[0]
};
