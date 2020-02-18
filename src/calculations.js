export function subtract(a, b) {
  const result = a - b;
  return result;
}

export function add(a, b) {
  const result = Number(a) + Number(b);
  return result;
}

export function valuesTotal(arr) {
  return arr
    .map(el => el.value)
    .reduce((acc, curr) => {
      return acc + curr / 100;
    }, 0);
}
