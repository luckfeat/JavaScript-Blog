export default class Component {
  constructor(template, data) {
    this.root = document.querySelector('#root');

    if (template) {
      this.template = typeof template === 'function' ? template(data) : null;
    }
  }

  appendMany(components) {
    components.forEach(component => {
      this.root.appendChild(component);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  replaceElement(oldElement, newElement) {
    oldElement.parentNode.insertBefore(newElement, oldElement.nextSibling);
    oldElement.parentNode.removeChild(oldElement);
  }

  render(tag = 'div') {
    const fragment = document.createElement(tag);
    fragment.innerHTML = this.template;
    return fragment;
  }
}
