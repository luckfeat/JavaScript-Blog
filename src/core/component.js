export default class Component {
  constructor(payload = {}) {
    const { template } = payload;
    this.template = typeof template === 'function' ? template() : null;
  }

  render(div = 'div') {
    const fragment = document.createElement(div);
    fragment.innerHTML = this.template;
    return fragment;
  }
}
