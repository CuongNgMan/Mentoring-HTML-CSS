class ReversePromise extends Promise {
  constructor(cb) {
    super(cb);
    this.stack = [];
    this.exec = null;
  }

  then(cb) {
    this.stack.push(cb);
    return this;
  }

  _run() {
    while (this.stack.length) {
      new Promise(this.stack.pop());
    }
  }
}

function main() {
  const p = new ReversePromise((resolve, _reject) => {
    console.log(1);
    resolve();
  })
    .then(() => console.log(2))
    .then(() => console.log(3))
    .then(() => console.log(4))
    .then(() => console.log(5));

  queueMicrotask(() => {
    p._run();
  });
}

main();
