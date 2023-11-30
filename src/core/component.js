export default class Component {
  constructor(payload = {}) {
    const { template, tagName, state } = payload;
    this.template = template;
    this.tag = document.querySelector(tagName);
    this.state = state;
  }

  render() {
    this.tag.innerHTML = this.template();
  }
}
