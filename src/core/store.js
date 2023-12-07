export default class Store {
  constructor(data = {}) {
    this.state = {};
    this.observer = {};
    for (const key in data) {
      Object.defineProperty(this.state, key, {
        get: () => {
          return data[key];
        },
        set: (value) => {
          data[key] = value;
          console.log('SET');
          this.observer[key]();
        },
      });
    }
  }
  subscribe(key, callBack) {
    this.observer[key] = callBack;
  }
}
