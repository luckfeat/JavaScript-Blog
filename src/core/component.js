export default class Component {
  constructor(payload = []) {
    if (payload) {
      const [template] = payload;
      this.template =
        typeof template === 'function' ? template(payload[1]) : null;
    }
  }

  render(tag = 'div') {
    const fragment = document.createElement(tag);
    fragment.innerHTML = this.template;
    return fragment;
  }
}
