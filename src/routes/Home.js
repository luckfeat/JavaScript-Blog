import Component from '../core/component';
import { Header, Carousel, Footer } from '../components';
import articlesStore, { updateArticles } from '../store/articles.js';

articlesStore.subscribe('articles', ()=>{
  console.log('Update Articles')
});

console.log('Read File')

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
    const header = await new Header().render('header')
    const articles = await updateArticles()
    await updateArticles()
    const carousel = await new Carousel(articles).render('section')
    const footer = await new Footer().render('footer')
    this.appendMany([header, carousel, footer])
  }
}
