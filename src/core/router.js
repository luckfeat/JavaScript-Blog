export default class Router {
  constructor(routes) {
    this.root = document.querySelector('#root');
    this.routes = routes;
    this.currentPath = location.hash;
    console.log(this.currentPath);
    this.render();
  }

  loadPage(route) {
    this.root.innerHTML = '';
    new route().initialize();
  }

  checkHash() {
    if (!location.hash) {
      history.replaceState(null, null, '/#/');
    }
  }

  render() {
    this.checkHash();
    if (this.routes[this.currentPath]) {
      this.loadPage(this.routes[this.currentPath]);
    } else {
      this.root.innerHTML = '<h1>Page Not Found</h1>';
    }
  }

  listen() {
    window.addEventListener('hashchange', () => {
      this.currentPath = location.hash;
      this.render();
    });
  }
}
