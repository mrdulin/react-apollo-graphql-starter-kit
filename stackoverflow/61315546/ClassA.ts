export class ClassA {
  public methodA() {
    this.methodB();
    this.methodC();
    return 'ClassA';
  }
  public methodB() {}
  public methodC() {}
}
