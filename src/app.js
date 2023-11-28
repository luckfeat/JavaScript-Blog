import appTemplate from './app.template';

export default class App {
  template = appTemplate;
  constructor(container) {
    this.container = document.querySelector(container);
  }

  render() {
    this.container.innerHTMl = this.template();
  }
}
