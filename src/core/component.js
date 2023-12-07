export default class Component {
  constructor(payload = {}) {
    const { template, state } = payload;
    this.template = typeof template === 'function' ? template(state) : null;
  }

  domLoaded(callBack) {
    document.addEventListener('DOMContentLoaded', () => {
      callBack();
    });
  }

  render(tag = 'div') {
    const fragment = document.createElement(tag);
    fragment.innerHTML = this.template;
    return fragment;
  }
}
