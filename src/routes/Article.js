import Component from '../core/component';
import { Detail } from '../components';
import { getDetail } from '../store/articles';

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
  async initialize() {
    const { category, title, date } = this.checkQueryString();

    if (category) {
      const articleDetail = await getDetail(title, category);
      this.root.appendChild(new Detail(articleDetail).render('section', 'article'));
    } else if (date) {
      const articleDetail = await getDetail(title, date);
      this.root.appendChild(new Detail(articleDetail).render('section', 'article'));
    }
  }
}
