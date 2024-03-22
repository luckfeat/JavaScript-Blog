import Component from '../core/component';
import { Nav, Header, Carousel, Keyword, Daily, Writer, Recommend, Footer } from '../components';
import articlesStore, { getArticles } from '../store/articles';

export default class Home extends Component {
  constructor() {
    super();
    this.carousel = null;
  }

  // eslint-disable-next-line require-await
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
    ];
    components.forEach(({ type, target }) => {
      // eslint-disable-next-line new-cap
      this.root.appendChild(new type().render(target));
    });

    /* Carousel 컴포넌트 안에서 데이터를 수신하는 게 컴포넌트로서의 의미를 갖는 게 아닌지 */
    this.carousel = document.querySelector('.carousel');
    // const articles = await getArticles();
    // this.replaceElement(this.carousel, new Carousel(articles.slice(0, 25)).render());

    document.querySelector('.keywords').addEventListener('click', event => {
      if (event.target.tagName === 'TD') {
        console.log(event.target.textContent);
      }
    });

    /* weekdates 값을 HTML value 값으로 넘기기 */
    /* 클릭시 화면 이동 -> Detail */
    document.querySelector('.daily').addEventListener('click', event => {
      if (event.target.tagName === 'LI') {
        console.log(event.target.textContent);
      }
    });

    const getWeekDates = () => {
      const dates = [];
      const today = new Date();
      const dayOfWeek = today.getDay(); // 오늘의 요일 인덱스 (일요일 = 0)
      const dayOfMonth = today.getDate();
      const month = today.getMonth();
      const year = today.getFullYear();
      const differenceToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
      const monday = new Date(year, month, dayOfMonth + differenceToMonday);

      for (let i = 0; i <= 6; i++) {
        let date = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i);
        if (date > today) {
          date = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7);
        }
        dates.push(`${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`);
      }

      return dates;
    };

    console.log(getWeekDates());
  }

  // eslint-disable-next-line class-methods-use-this
}
