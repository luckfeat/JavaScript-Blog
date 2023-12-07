export default class Component {
  constructor(payload = {}) {
    const { template, state } = payload;
    this.template = typeof template === 'function' ? template(state) : null;
  }

  render(tag = 'div') {
    const fragment = document.createElement(tag);
    fragment.innerHTML = this.template;
    return fragment;
  }
}
