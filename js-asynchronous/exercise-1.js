class MyPromise extends Promise {
  constructor(cb) {
    super(cb);
  }

  syncThen(cb) {
    cb();
    return this;
  }
}

let p = new MyPromise((resolve) => {
  console.log(1);
  resolve();
})
  .then(() => console.log(4))
  .syncThen(() => console.log(2))
  .syncThen(() => console.log(5))
  .then(() => console.log(7));

console.log(6);
