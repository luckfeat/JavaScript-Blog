export default class Store {
  constructor(data = {}) {
    this.state = {};
    this.observers = {};
    for (const key in data) {
      Object.defineProperty(this.state, key, {
        get: () => {
          return data[key];
        },
        set: (value) => {
          data[key] = value;
          this.observers[key].forEach((observer) => {
            observer();
          });
        },
      });
    }
  }
  subscribe(key, callBack) {
    this.observers[key] = callBack;
    Array.isArray(this.observers[key])
      ? this.observers[key].push(callBack)
      : (this.observers[key] = [callBack]);
  }
}
