export default class Router {
  constructor(routes) {
    this.root = document.querySelector('#root');
    this.routes = routes;
    // eslint-disable-next-line no-restricted-globals
    this.currentPath = location.hash;
    this.render();
  }

  loadPage(Route) {
    this.root.innerHTML = '';
    new Route().initialize();
  }

  // eslint-disable-next-line class-methods-use-this
  checkHash() {
    // eslint-disable-next-line no-restricted-globals
    if (!location.hash) {
      // eslint-disable-next-line no-restricted-globals
      history.replaceState(null, null, '/#/');
    } else {
      // eslint-disable-next-line no-restricted-globals
      const [hash, queryString] = location.hash.split('?');
      const query = queryString?.split('&').reduce((acc, cur) => {
        const [key, value] = cur.split('=');
        acc[key] = value;

        return acc;
      }, {});
      // eslint-disable-next-line no-restricted-globals
      history.replaceState(query, '');
      this.currentPath = hash;
    }
  }

  render() {
    this.checkHash();
    const currentRoute = this.routes[this.currentPath];
    currentRoute ? this.loadPage(currentRoute) : (this.root.innerHTML = '<h1>Page Not Found</h1>');
    window.scrollTo(0, 0);
  }

  listen() {
    window.addEventListener('hashchange', () => {
      this.checkHash();
      this.render();
    });
  }
}
