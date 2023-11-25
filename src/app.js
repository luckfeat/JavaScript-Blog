export default class App {
  template = template;
  constructor(container, data) {
    this.container = document.querySelector(container);
    this.data = data;
  }
}
