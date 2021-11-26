const add = (...args) => args.reduce((a, b) => a + b, 0);

function makeCurryN(n) {
  return function curry(fn) {
    return function nestedCurry(...args) {
      if (args.length >= n) {
        return fn.apply(this, args);
      } else {
        return function (...args2) {
          return nestedCurry.apply(this, args.concat(args2));
        };
      }
    };
  };
}

const curryOf3 = makeCurryN(3);
const sum = curryOf3(add);

console.log(sum(1, 2)(4));
console.log(sum(1)(2)(3));
