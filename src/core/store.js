export default class Store {
    constructor(payload = {}) {
        this.state = {};
        this.observers = {};
        this.initialize(payload);
    }

    initialize(payload) {
        for (const key in payload) {
            Object.defineProperty(this.state, key, {
                get: () => {
                    return payload[key]
                },
                set: (value) => {
                    payload[key] = value;
                    this.observers[key].forEach((observer) => {
                        observer();
                    });
                },
            });
        }
    }

    subscribe(key, callBack) {
        Array.isArray(this.observers[key])
            ? this.observers[key].push(callBack)
            : (this.observers[key] = [callBack]);
    }
}
