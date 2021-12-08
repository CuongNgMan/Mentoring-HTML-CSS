class ReversePromise extends Promise {
  constructor(fn) {
    super(() => fn);
    this.fn = fn;
    this.stack = [];
    this.exec = null;
  }
  then(fn) {
    this.stack.push(fn);

    if (this.exec) {
      clearTimeout(this.exec);
    }

    this.exec = setTimeout(() => {
      this.run();
    }, 0);

    return this;
  }

  run() {
    const p = new Promise(this.fn);
    let current = p;

    while (this.stack.length) {
      current = current.then(this.stack.pop());
    }

    return p;
  }
}

let promise2 = new ReversePromise((resolve) => {
  console.log(1);
  resolve();
})
  .then(() => console.log(2))
  .then(() => console.log(3))
  .then(() => console.log(4));
