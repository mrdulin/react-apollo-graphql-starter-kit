export default class A {
  classB;
  constructor(classB) {
    this.classB = classB;
  }

  getName() {
    return this.classB.getName();
  }
}
