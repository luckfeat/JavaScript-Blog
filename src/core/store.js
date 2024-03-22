export default class Store {
  constructor(payload = {}) {
    this.state = {};
    this.observers = {};
    this.initialize(payload);
  }

  initialize(payload) {
    // eslint-disable-next-line guard-for-in
    for (const key in payload) {
      Object.defineProperty(this.state, key, {
        get: () => payload[key],
        set: value => {
          payload[key] = value;
          this.observers[key].forEach(observer => {
            observer();
          });
        },
      });
    }
  }

  subscribe(key, callBack) {
    /* store - 값을 할당하는 경우 실행 시킬 함수 구독 */
    Array.isArray(this.observers[key]) ? this.observers[key].push(callBack) : (this.observers[key] = [callBack]);
  }
}
