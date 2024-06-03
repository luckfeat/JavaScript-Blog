import Component from '../core/component';
import { Header, Trend, Keyword, Daily, Recommend, Footer } from '../components';
import articlesStore, {
  renderDateNewsWithLimit,
  renderKeywordNewsWithLimit,
  renderYesterdayNewsExtended,
} from '../store/articles';

export default class Home extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
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
      { type: Header, tag: 'header' },
      { type: Trend, tag: 'article', cls: 'trend' },
      { type: Keyword, tag: 'section', cls: 'keyword' },
      { type: Daily, tag: 'article', cls: 'daily' },
      { type: Recommend, tag: 'section', cls: 'recommend' },
      { type: Footer, tag: 'footer' },
    ];

    for (const { type, tag, cls } of components) {
      switch (type.name) {
        case 'Trend':
          // eslint-disable-next-line no-case-declarations,no-await-in-loop
          const articles = await renderYesterdayNewsExtended();
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
          // eslint-disable-next-line no-case-declarations
          const gridLength = gridType.filter(el => el.articles.length > 0).length;

          gridType.splice(gridLength - 1);

          // eslint-disable-next-line no-case-declarations
          const gridPagination = [];

          for (let i = 1; i < gridLength; i++) {
            gridPagination.push(i);
          }

          this.root.appendChild(new Trend({ gridType, gridPagination }).render(tag, cls));

          // eslint-disable-next-line no-case-declarations
          const carousel = document.querySelector('.trend__carousel');
          // eslint-disable-next-line no-case-declarations
          const prevBtn = document.querySelector('.trend__prev');
          // eslint-disable-next-line no-case-declarations
          const nextBtn = document.querySelector('.trend__next');
          // eslint-disable-next-line no-case-declarations
          const paginationButtons = document.querySelectorAll('.trend__pagination-number');
          // eslint-disable-next-line no-case-declarations
          const paginationButtonDivs = document.querySelectorAll('.trend__pagination-page');

          // eslint-disable-next-line no-case-declarations
          let offset = 0;
          // eslint-disable-next-line no-case-declarations
          const translatePixelSize = 960;
          // eslint-disable-next-line no-case-declarations
          let translatePixel = 0;

          prevBtn.style.display = 'none';

          // eslint-disable-next-line no-case-declarations
          const updateCarousel = update => {
            if (update) {
              translatePixel += translatePixelSize;
            } else {
              translatePixel -= translatePixelSize;

              if (offset === 0) {
                translatePixel = 0;
              }
            }

            prevBtn.style.display = offset === 0 ? 'none' : 'block';
            nextBtn.style.display = offset === gridLength - 2 ? 'none' : 'block';
            carousel.style.transform = `translateX(-${translatePixel}px)`;
          };
          // eslint-disable-next-line no-case-declarations
          const moveCarousel = () => {
            translatePixel = translatePixelSize * offset;
            prevBtn.style.display = offset === 0 ? 'none' : 'block';
            nextBtn.style.display = offset === gridLength - 2 ? 'none' : 'block';
            carousel.style.transform = `translateX(-${translatePixel}px)`;
          };
          // eslint-disable-next-line no-case-declarations
          const changeOffSet = (currentPage, prev, next) => {
            paginationButtons.forEach(btn => btn.classList.remove('trend__pagination-number--active'));

            if (typeof currentPage === 'number') {
              offset = currentPage;
            } else if (prev) {
              offset--;
            } else if (next) {
              offset++;
            }

            paginationButtons[offset].classList.add('trend__pagination-number--active');
          };

          paginationButtons[0].classList.add('trend__pagination-number--active');
          prevBtn.addEventListener('click', () => {
            if (offset > 0) {
              // offset--;
              changeOffSet(false, true);
              updateCarousel(false);
            }
          });
          nextBtn.addEventListener('click', () => {
            if (offset < gridLength - 1) {
              // offset++;
              changeOffSet(false, false, true);
              updateCarousel(true);
            }
          });
          paginationButtonDivs.forEach(btn => {
            btn.addEventListener('click', () => {
              changeOffSet(btn.textContent - 1);
              moveCarousel();
            });
          });
          break;
        case 'Daily':
          // eslint-disable-next-line no-case-declarations
          const [monday, tuesday, wednesday, thursday, friday, saturday, sunday] = this.getWeekDates();
          // eslint-disable-next-line no-case-declarations
          const daysOfWeek = [
            { monday },
            { tuesday },
            { wednesday },
            { thursday },
            { friday },
            { saturday },
            { sunday },
          ];
          // eslint-disable-next-line no-case-declarations
          const newsArray = [];

          for (const day of daysOfWeek) {
            const key = Object.keys(day)[0];
            const date = day[key];
            // eslint-disable-next-line no-await-in-loop
            const news = await renderDateNewsWithLimit(date);
            newsArray.push({ [key]: news, day: key });
          }

          this.root.appendChild(
            new Daily({ monday, tuesday, wednesday, thursday, friday, saturday, sunday, newsArray }).render(tag, cls),
          );

          // eslint-disable-next-line no-case-declarations
          const dailyNewsLists = document.querySelectorAll('.daily__news');
          // eslint-disable-next-line no-case-declarations
          const dailyPaginationLists = document.querySelectorAll('.daily__pagination');
          // eslint-disable-next-line no-case-declarations
          const daysInWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
          // eslint-disable-next-line no-case-declarations
          const today = new Date().getDay();
          // eslint-disable-next-line no-case-declarations
          const todayClass = daysInWeek[today];

          dailyNewsLists.forEach(list => {
            list.style.display = 'none';
          });

          dailyPaginationLists.forEach(pagination => {
            pagination.addEventListener('click', () => {
              document.querySelectorAll('.daily__pagination--active').forEach(element => {
                element.classList.remove('daily__pagination--active');
              });

              pagination.classList.add('daily__pagination--active');

              dailyNewsLists.forEach(list => {
                list.style.display = 'none';
              });

              document.querySelector(`.daily__news.${pagination.classList[1]}`).style.display = 'flex';
            });
          });

          document.querySelector(`.daily__news.${todayClass}`).style.display = 'flex';
          document.querySelector(`.daily__pagination.${todayClass}`).classList.add('daily__pagination--active');
          break;
        case 'Recommend':
          // eslint-disable-next-line no-case-declarations,no-await-in-loop
          const recommendation = await renderKeywordNewsWithLimit('ai');
          // eslint-disable-next-line no-case-declarations
          let recommendStart = 0;
          // eslint-disable-next-line no-case-declarations
          let recommendEnd = 10;
          // eslint-disable-next-line no-case-declarations
          let recommendationNews = recommendation.slice(recommendStart, recommendEnd);

          this.root.appendChild(new Recommend(recommendationNews).render(tag, cls));

          // eslint-disable-next-line no-case-declarations
          const infCarousel = document.querySelector('.recommend__carousel');
          // eslint-disable-next-line no-case-declarations
          let infCarouselLength = infCarousel.querySelectorAll('li').length;
          // eslint-disable-next-line no-case-declarations
          const recommendCarousel = document.querySelector('.recommend__carousel');
          // eslint-disable-next-line no-case-declarations
          const prevBtnRecommend = document.querySelector('.recommend__prev');
          // eslint-disable-next-line no-case-declarations
          const nextBtnRecommend = document.querySelector('.recommend__next');
          // eslint-disable-next-line no-case-declarations
          let offsetInf = 0;
          // eslint-disable-next-line no-case-declarations
          const translatePixelSizeInf = 960;
          // eslint-disable-next-line no-case-declarations
          let infCarouselWidth = infCarouselLength / 5;

          prevBtnRecommend.style.display = 'none';

          // eslint-disable-next-line no-case-declarations
          const updateRecommend = () => {
            const translatePixel = offsetInf * translatePixelSizeInf;
            recommendCarousel.style.transform = `translateX(-${translatePixel}px)`;
            prevBtnRecommend.style.display = offsetInf === 0 ? 'none' : 'block';
            nextBtnRecommend.style.display = offsetInf >= infCarouselWidth + 4 ? 'none' : 'block';
          };

          prevBtnRecommend.addEventListener('click', () => {
            if (offsetInf > 0) {
              offsetInf--;
              updateRecommend();
            }
          });
          nextBtnRecommend.addEventListener('click', () => {
            if (offsetInf < infCarouselWidth + 4) {
              offsetInf++;
              if (offsetInf === infCarouselWidth) {
                recommendStart += 10;
                recommendEnd += 10;

                if (recommendEnd <= recommendation.length) {
                  recommendationNews = recommendation.slice(recommendStart, recommendEnd);
                } else {
                  recommendationNews = null;
                }

                if (recommendationNews) {
                  new Recommend(recommendationNews, true)
                    .render(tag, cls)
                    .querySelectorAll('li')
                    .forEach(li => {
                      infCarousel.appendChild(li);
                    });
                  infCarouselLength = infCarousel.querySelectorAll('li').length;
                  infCarouselWidth = infCarouselLength / 5;
                  infCarousel.style.width = infCarousel.getBoundingClientRect().width * 1.15 + 'px';
                }
              }
              updateRecommend();
            }
            console.log(`offset:${offsetInf}`);
            console.log(`infCarouselWidth:${infCarouselWidth}`);
          });
          break;
        default:
          // eslint-disable-next-line new-cap
          this.root.appendChild(new type().render(tag, cls));
          break;
      }
    }
  }
}
