import { collection } from 'firebase/firestore';
import Component from '../core/component';
import { Detail } from '../components';
import { renderNewsDetail } from '../store/articles';

export default class Article extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  // eslint-disable-next-line class-methods-use-this
  checkQueryString() {
    // eslint-disable-next-line no-restricted-globals
    const [, queryString] = location.hash.split('?');
    const query = queryString?.split('&').reduce((acc, cur) => {
      const [key, value] = cur.split('=');
      acc[key] = value;

      return acc;
    }, {});

    return query;
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

  /* 기사 다음, 이전 배열 넘기기 */

  // eslint-disable-next-line class-methods-use-this
  async initialize() {
    const { category, title, date } = this.checkQueryString();

    const articleDetail = await renderNewsDetail(title, category || date);

    function makeKeywords(content) {
      const words = content.split(' ');

      return words;
    }

    const keywordList = makeKeywords(articleDetail.content).reduce((collection, current) => {
      const keyword = current.replace(/[^a-zA-Z0-9]/g, '');

      if (keyword.length > 3 && keyword in collection) {
        collection[keyword]++;
      } else if (keyword.length > 3 && keyword.length < 10) {
        collection[keyword] = 1;
      }

      return collection;
    }, {});

    /* reduce */
    /* if 같은 단어 and word > 4, [저장된 단어] : Count++ */

    const articleContent = this.divideIntoParagraphs(articleDetail.content);

    articleDetail.content = articleContent;

    /* state 에서 previous or next article 가져오기 */
    /* 1. 키워드 분류 */
    /* 2. Article Description */
    /* 3. Footer Banner */

    this.root.appendChild(new Detail(articleDetail).render('div', 'article'));
  }
}
