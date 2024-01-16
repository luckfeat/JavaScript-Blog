import Component from '../core/component';
import { Header, Carousel, Footer } from '../components';
import articlesStore, { updateArticles } from '../store/articles.js';

articlesStore.subscribe('articles', ()=>{});

export default class Home extends Component {
  constructor() {
    super();
    this.root = document.querySelector('#root');
    this.button = document.createElement('button');
    this.button.textContent = 'Refresh';
  }

  appendMany(components) {
    components.forEach(component => {
      this.root.appendChild(component);
    })
  }

  async initialize() {
    const header =  new Header().render('header')
    const articles = await updateArticles()
    const carousel =  new Carousel(articles).render('section')
    const footer =  new Footer().render('footer')
    this.appendMany([header, carousel, footer])
    console.log(articlesStore)
  }
}
