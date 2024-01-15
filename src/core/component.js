export default class Component {
  constructor(template, data) {
    if (template) {
      this.template =
          typeof template === 'function' ? template(data) : null;
    }
  }

  buildTemplate(template, data) {

  }

  async render(tag = 'div') {
    const fragment = document.createElement(tag);
    fragment.innerHTML = this.template;
    return fragment;
  }
}
