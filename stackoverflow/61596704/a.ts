export default class A {
  classB;
  constructor(classB) {
    this.classB = classB;
  }

  public getName() {
    return this.classB.getName();
  }
}
