class xyz {
  storingRepo: Object;

  constructor() {
    this.storingRepo = {};
  }

  storeProduct(a: string, b: string) {
    const key = `${a}_${b}`;
    this.storingRepo[key] = true;
  }
}

export default new xyz();
