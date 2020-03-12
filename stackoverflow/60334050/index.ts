class FakeLocalStorage {
  store = {};
  setItem = (key, val) => (this.store[key] = val);
  getItem = (key) => this.store[key];
  removeItem = (key) => {
    delete this.store[key];
  };
  clear = () => (this.store = {});
}

let fakeLocalStorage = new FakeLocalStorage();
fakeLocalStorage = new Proxy(fakeLocalStorage, {
  ownKeys: (target) => {
    return Object.keys(target.store);
  },
  getOwnPropertyDescriptor(k) {
    return {
      enumerable: true,
      configurable: true,
    };
  },
});

(async function test() {
  fakeLocalStorage.setItem('name', 'TS');
  fakeLocalStorage.setItem('age', 23);
  const keys = Object.keys(fakeLocalStorage);
  console.log('keys:', keys);
})();
