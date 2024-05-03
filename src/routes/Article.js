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
    /* 여기서 title, date 변경해서 넘기기 */
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
        console.error('현재 기사에 접근할 수 없습니다.');
      }
    }

    /* 2. Author */
    /* 3. Footer Banner */
    this.root.appendChild(new Detail(articleDetail).render('div', 'article'));
  }
}
