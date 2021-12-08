class MyPromise extends Promise {
  constructor(cb) {
    super(cb);
    this.basePromise = cb;
  }

  syncThen(cb) {
    cb();
    return this;
  }

  then(cb) {
    queueMicrotask(() => {
      cb();
    });
    return this;
  }
}

function main() {
  new MyPromise((resolve, _reject) => {
    console.log(1);
    resolve();
  })
    .then(() => console.log(4))
    .syncThen(() => console.log(2))
    .syncThen(() => console.log(5))
    .then(() => console.log(7));
}

main();
console.log(6);
