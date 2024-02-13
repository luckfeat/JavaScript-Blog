import Component from '../core/component';
import { Nav, Header, Carousel, Keyword, Daily, Writer, Recommend, Footer } from '../components';
import { updateArticles } from '../core/api/newsApi.js';
import { loadArticles, loadNextArticles, searchArticles } from '../store/articles';

export default class Home extends Component {
  constructor() {
    super();
    this.button = document.createElement('button');
    this.button.textContent = 'Refresh';
    this.carousel = null;
  }

  initialize() {
    const nav = new Nav().render('nav');
    const header = new Header().render('header');
    const carousel = new Carousel().render('section');
    const keyWord = new Keyword().render('section');
    const daily = new Daily().render('section');
    const writer = new Writer().render('section');
    const recommend = new Recommend().render('section');
    const footer = new Footer().render('footer');
    const components = [nav, header, carousel, keyWord, daily, writer, recommend, footer];

    this.carousel = carousel;
    this.appendMany(components);

    updateArticles();
    loadArticles().then(articles => {
      this.replaceElement(this.carousel, new Carousel(articles).render('section'));
    });

    // loadNextArticles().then((nextArticles)=>{
    //     console.log(nextArticles)
    // })

    // searchArticles('Elon').then(articles => {
    //   console.log(articles);
    // });
  }
}
