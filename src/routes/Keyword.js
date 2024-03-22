import Component from '../core/component';
import { Main } from '../components/index';
import { getKeyword } from '../store/articles.js';

export default class Keyword extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  // eslint-disable-next-line class-methods-use-this,require-await
  async initialize() {
    // eslint-disable-next-line no-restricted-globals
    const { category } = history.state;
    const keywordNews = await getKeyword(category);

    console.log(keywordNews);

    this.root.appendChild(new Main(keywordNews).render('section', 'keyword'));
  }
}
