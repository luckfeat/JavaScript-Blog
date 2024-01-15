export default class Store {
  constructor(payload = {}) {
    this.state = {};
    this.observers = {};
    this.initialize(payload);
  }
  /**
   * 스토어 인스턴스에서 객체를 인자로 받기
   * 받은 객체를 this.state에 재정의
   * get, set 메서드 연결
   * 개별 컴포넌트에서 observer에 함수 추가
   * store 객체 변경시 observer에서 store 관련 함수들 실행
   */
  initialize(payload) {
    for (const key in payload) {
      Object.defineProperty(this.state, key, {
        get: () => payload[key],
        set: (value) => {
          payload[key] = value;
          this.observers[key].forEach((observer) => {
            observer();
          });
          console.log('Set');
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
