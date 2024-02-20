import Component from '../core/component';
import { Nav, Header, Carousel, Keyword, Daily, Writer, Recommend, Footer } from '../components';
import { updateArticles } from '../core/api/newsApi';
import { loadArticles } from '../store/articles';

export default class Home extends Component {
  constructor() {
    super();
    this.button = document.createElement('button');
    this.button.textContent = 'Refresh';
    this.carousel = null;
  }

  async initialize() {
    const components = [
      { type: Nav, target: 'nav' },
      { type: Header, target: 'header' },
      { type: Carousel, target: 'section' },
      { type: Keyword, target: 'section' },
      { type: Daily, target: 'section' },
      { type: Writer, target: 'section' },
      { type: Recommend, target: 'section' },
      { type: Footer, target: 'footer' },
      // render template 클래스 추가 - 현재 태그만 생성
    ];
    components.forEach(({ type, target }) => {
      // eslint-disable-next-line new-cap
      this.root.appendChild(new type().render(target));
    });

    this.carousel = document.querySelector('.carousel');
    const articles = await loadArticles();
    this.replaceElement(this.carousel, new Carousel(articles.slice(0, 25)).render());
  }
}
