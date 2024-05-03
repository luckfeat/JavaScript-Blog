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
  convertDateFormat(isoDateString) {
    // 'T' 기준으로 문자열을 나누고 첫 번째 부분(날짜 부분)을 가져옵니다.
    const datePart = isoDateString.split('T')[0];

    // '-'를 기준으로 연, 월, 일을 나눕니다.
    const [year, month, day] = datePart.split('-');

    // 형식에 맞게 문자열을 재구성합니다.
    return `${year}.${parseInt(month)}.${parseInt(day)}`;
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
    const articleDetail = await renderNewsDetail(searchTitle, category || formatDate);
    articleDetail.keywords = this.makeKeywords(articleDetail.content);
    const articleContent = this.divideIntoParagraphs(articleDetail.content);
    articleDetail.content = articleContent;
    articleDetail.recommend = await renderYesterdayNewsExtendedWithLimit();
    const [prev, next] = articleDetail.recommend;
    articleDetail.prev = prev;
    articleDetail.next = next;
    /* 2. Author */
    /* 3. Footer Banner */
    this.root.appendChild(new Detail(articleDetail).render('div', 'article'));
  }
}
