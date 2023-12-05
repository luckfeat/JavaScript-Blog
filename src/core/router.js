export default class Router {
  constructor(routes) {
    this.root = document.querySelector('#root');
    this.routes = routes;
    this.currentPath = location.hash;
    this.render();
  }

  render() {
    console.log('Rendered');
    console.log(`current : ${this.currentPath}`);
    switch (this.currentPath) {
      case '':
        this.root.innerHTML = '';
        new this.routes.Home().initialize();
        break;
      case '#/feed':
        this.root.innerHTML = '';
        new this.routes.Feed().initialize();
        break;
      default:
        this.root.innerHTML = '<h1>Page Not Found</h1>';
    }
  }

  listen() {
    window.addEventListener('hashchange', () => {
      this.currentPath = location.hash;
      this.render();
      console.log(`location.hash : ${this.currentPath}`);
    });
  }
}

/**
 * 라우터
 * location.hash
 * # -> #author/article_number
 */
