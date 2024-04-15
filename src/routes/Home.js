import Component from '../core/component';
import { Nav, Header, Trend, Keyword, Daily, Writer, Recommend, Footer } from '../components';
import articlesStore, { renderNews, renderKeywordNews, renderYesterdayNews } from '../store/articles';

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
      { type: Trend, tag: 'article', cls: 'trend' },
      // { type: Keyword, tag: 'section', cls: 'keyword' },
      // { type: Daily, tag: 'section', cls: 'daily' },
      // { type: Writer, tag: 'section', cls: 'writer' },
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
            { type: 'trend__grid-main', articles: articles.slice(0, 2) },
            { type: 'trend__grid-three', articles: articles.slice(2, 5) },
            { type: 'trend__grid-four', articles: articles.slice(5, 9) },
            { type: 'trend__grid-vertical', articles: articles.slice(9, 12) },
            { type: 'trend__grid-horizontal', articles: articles.slice(12, 16) },
            { type: 'trend__grid-three', articles: articles.slice(16, 19) },
            { type: 'trend__grid-four', articles: articles.slice(19, 23) },
            { type: 'trend__grid-three', articles: articles.slice(23, 26) },
            { type: 'trend__grid-vertical', articles: articles.slice(26, 29) },
          ];

          this.root.appendChild(new Trend(gridType).render(tag, cls));
          break;
        case 'Daily':
          // eslint-disable-next-line no-case-declarations
          const [monday, tuesday, wednesday, thursday, friday, saturday, sunday] = this.getWeekDates();
          this.root.appendChild(
            new Daily({ monday, tuesday, wednesday, thursday, friday, saturday, sunday }).render(tag, cls),
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
