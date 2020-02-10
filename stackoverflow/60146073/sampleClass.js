class SampleClass {
  constructor(param1) {
    this.param1 = param1;
    this.init();
  }
  async init() {
    await this.getData();
    this.loadIframe();
  }
  async getData() {
    const url = 'https://stackoverflow.com/';
    const response = await fetch(url);
    const data = response.json();
    this.param2 = data;
  }
  loadIframe() {}
}

export { SampleClass };
