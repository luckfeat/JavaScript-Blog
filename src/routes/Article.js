import Component from '../core/component';
import { Detail } from '../components';
import articlesStore, { getDetail } from '../store/articles';
import articles from '../store/articles';

export default class Article extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  // eslint-disable-next-line class-methods-use-this
  async initialize() {
    const category = Object.keys(articlesStore.state)[0];
    // eslint-disable-next-line no-restricted-globals
    const [, queryString] = location.hash.split('?');
    const query = queryString?.split('&').reduce((acc, cur) => {
      const [key, value] = cur.split('=');
      acc[key] = value;

      return acc;
    }, {});

    const { title } = query;

    const articleDetail = await getDetail(title, category);
    this.root.appendChild(new Detail(articleDetail).render('section', 'article'));
  }
}
