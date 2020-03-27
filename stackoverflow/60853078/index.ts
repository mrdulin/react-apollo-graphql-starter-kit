export class A {
  doSomething() {
    console.log('real implementation');
  }
}

export class B extends A {
  doSomethingElse() {
    this.doSomething();
  }
}
