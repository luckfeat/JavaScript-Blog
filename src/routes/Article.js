import { collection } from 'firebase/firestore';
import Component from '../core/component';
import { Detail } from '../components';
import { renderNewsDetail, renderYesterdayNewsExtendedWithLimit } from '../store/articles';

export default class Article extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  // eslint-disable-next-line class-methods-use-this
  checkQueryString() {
    // eslint-disable-next-line no-restricted-globals
    const [, queryString] = location.hash.split('?');

    const query = queryString?.split('&').map(data => {
      const result = [];
      const [key, value] = data.split('=');

      result.push(key);
      result.push(value);

      return result;
    });

    const queryObject = query.reduce((acc, cur) => {
      const [key, value] = cur;
      acc[key] = value;

      return acc;
    }, {});

    return queryObject;
  }

  // eslint-disable-next-line class-methods-use-this
  divideIntoParagraphs(content) {
    const paragraphs = content
      .split('.')
      .map(sentence => sentence.trim())
      .filter(sentence => sentence)
      .reduce((acc, sentence, index) => {
        const number = Math.floor(index / 4);
        acc[number] = acc[number] || [];
        acc[number].push(sentence + '.');

        return acc;
      }, [])
      .map(paragraph => paragraph.join(' '));

    return paragraphs;
  }

  // eslint-disable-next-line class-methods-use-this
  convertDateFormat(isoDateString, increment) {
    const datePart = isoDateString.split('T')[0];
    // eslint-disable-next-line prefer-const
    let [year, month, day] = datePart.split('-');

    if (increment) {
      day = parseInt(day, 10) + 1;
    }

    return `${year}.${parseInt(month, 10)}.${parseInt(day, 10)}`;
  }

  // eslint-disable-next-line class-methods-use-this
  makeKeywords(content) {
    const words = content.split(' ');

    const keywords = words.reduce((collection, current) => {
      const keyword = current.replace(/[^a-zA-Z0-9]/g, '');

      if (keyword.length > 3 && keyword in collection) {
        collection[keyword]++;
      } else if (keyword.length > 3 && keyword.length < 10) {
        collection[keyword] = 1;
      }

      return collection;
    }, {});

    for (const word in keywords) {
      if (keywords[word] < 2) {
        delete keywords[word];
      }
    }

    const keywordArray = Object.entries(keywords)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(value => value[0].toLowerCase());

    return keywordArray;
  }

  // eslint-disable-next-line class-methods-use-this
  async initialize() {
    const { category, title, date } = this.checkQueryString();
    const searchTitle = decodeURIComponent(title);
    const formatDate = date ? this.convertDateFormat(date) : false;
    const createDetailContent = async detail => {
      detail.keywords = this.makeKeywords(detail.content);
      detail.content = this.divideIntoParagraphs(detail.content);
      detail.recommend = await renderYesterdayNewsExtendedWithLimit();
      [detail.prev, detail.next] = detail.recommend;
    };

    let articleDetail = await renderNewsDetail(searchTitle, category || formatDate);

    if (articleDetail) {
      await createDetailContent(articleDetail);
    } else {
      const formatDate = date ? this.convertDateFormat(date, true) : false;
      articleDetail = await renderNewsDetail(searchTitle, category || formatDate);

      try {
        await createDetailContent(articleDetail);
      } catch (err) {
        alert('현재 해당 기사에 접근할 수 없습니다.');
        window.location.href = '';
      }
    }

    this.root.appendChild(new Detail(articleDetail).render('div', 'article'));

    const scrollHeader = document.querySelector('.detail-header__scroll');
    const scrollTitle = document.querySelector('.detail-header__scroll-title');
    const scrollBar = document.querySelector('.detail-header__progress-bar');
    const windowHeight = window.innerHeight; // 뷰포트 높이
    const documentHeight = document.body.offsetHeight; // 문서 전체 높이
    const scrollHeight = documentHeight - (windowHeight + 86 + 311);

    let scrollStart = window.scrollY - 448;

    window.addEventListener('scroll', () => {
      let opacity = 1 - (window.scrollY / (documentHeight - windowHeight)) * 1.6;

      if (opacity < 0.6) {
        opacity = 0.6;
      }

      document.querySelector('.article__cover-title').style.opacity = opacity;
    });
    window.addEventListener('scroll', () => {
      if (window.scrollY > 448) {
        scrollHeader.style.background = 'hsla(0, 0%, 100%, .9)';
        scrollTitle.style.display = 'block';
        scrollBar.style.display = 'block';
        scrollStart = window.scrollY - 448;
        scrollBar.style.width = `${(scrollStart / scrollHeight) * 100}%`;
      } else {
        scrollHeader.style.background = 'hsla(0, 0%, 100%, 0)';
        scrollTitle.style.display = 'none';
        scrollBar.style.display = 'none';
      }
    });
  }
}
