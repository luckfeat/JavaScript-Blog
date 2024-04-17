import Component from '../core/component';
import { Nav, Header, Trend, Keyword, Daily, Writer, Recommend, Footer } from '../components';
import articlesStore, {
  renderNews,
  renderDateNewsWithLimit,
  renderKeywordNews,
  renderYesterdayNews,
} from '../store/articles';

export default class Home extends Component {
  constructor() {
    super();
    this.recommendIncrement = 0;
    this.recommendStart = 0;
    this.recommendEnd = 50;
    this.carousel = null;
  }

  // eslint-disable-next-line class-methods-use-this
  getWeekDates() {
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
  }

  // eslint-disable-next-line require-await
  async initialize() {
    const components = [
      // { type: Nav, tag: 'nav' },
      // { type: Header, tag: 'header' },
      // { type: Trend, tag: 'article', cls: 'trend' },
      // { type: Keyword, tag: 'section', cls: 'keyword' },
      { type: Daily, tag: 'article', cls: 'daily' },
      // { type: Recommend, tag: 'section', cls: 'recommend' },
      // { type: Footer, tag: 'footer' },
    ];
    for (const { type, tag, cls } of components) {
      switch (type.name) {
        case 'Trend':
          // eslint-disable-next-line no-case-declarations,no-await-in-loop
          const articles = await renderYesterdayNews();
          /* 여기서 장문 기사 분류해서 게시 */
          /* firebase 조건문 사용하기, success=true */
          // eslint-disable-next-line no-case-declarations
          const gridType = [
            { type: 'trend__grid--vertical', articles: articles.slice(0, 3), vertical: true },
            { type: 'trend__grid--three', articles: articles.slice(3, 6) },
            { type: 'trend__grid--four', articles: articles.slice(6, 10), four: true },
            { type: 'trend__grid--vertical', articles: articles.slice(10, 13), vertical: true },
            { type: 'trend__grid--horizontal', articles: articles.slice(13, 17), horizontal: true },
            { type: 'trend__grid--three', articles: articles.slice(17, 20) },
            { type: 'trend__grid--four', articles: articles.slice(20, 24), four: true },
            { type: 'trend__grid--three', articles: articles.slice(24, 27) },
            { type: 'trend__grid--vertical', articles: articles.slice(27, 30), vertical: true },
          ];

          this.root.appendChild(new Trend(gridType).render(tag, cls));
          break;
        case 'Daily':
          // eslint-disable-next-line no-case-declarations
          const [monday, tuesday, wednesday, thursday, friday, saturday, sunday] = this.getWeekDates();
          // eslint-disable-next-line no-case-declarations
          const daysOfWeek = [
            { monday },
            // { tuesday },
            // { wednesday },
            // { thursday },
            // { friday },
            // { saturday },
            // { sunday },
          ];
          // eslint-disable-next-line no-case-declarations
          const newsArray = [];

          for (const day of daysOfWeek) {
            const key = Object.keys(day)[0];
            const date = day[key];
            // eslint-disable-next-line no-await-in-loop
            const news = await renderDateNewsWithLimit(date);
            newsArray.push({ [key]: news });
          }

          this.root.appendChild(
            new Daily({ monday, tuesday, wednesday, thursday, friday, saturday, sunday, newsArray }).render(tag, cls),
          );
          break;
        case 'Recommend':
          // eslint-disable-next-line no-case-declarations,no-await-in-loop
          const recommendation = await renderKeywordNews('ai');
          this.root.appendChild(new Recommend(recommendation.slice(0, 10)).render(tag, cls));
          this.recommend = document.querySelector('.recommend');
          this.next = document.querySelector('.next');
          break;
        default:
          // eslint-disable-next-line new-cap
          this.root.appendChild(new type().render(tag, cls));
          break;
      }
    }

    // this.next.addEventListener('click', () => {
    //   this.recommendIncrement++;
    //   if (this.recommendIncrement === 8) {
    //     this.recommendIncrement = 0;
    //     this.recommendStart += 51;
    //     this.recommendEnd += 51;
    //
    //     const moreArticles = articlesStore.state.ai.slice(this.recommendStart, this.recommendEnd);
    //
    //     if (moreArticles.length === 0) {
    //       return;
    //     }
    //
    //     this.recommend.appendChild(new Recommend(moreArticles, true).render());
    //   }
    // });
  }
}
