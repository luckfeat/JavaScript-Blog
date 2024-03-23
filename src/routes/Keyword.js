import Component from '../core/component';
import { KeywordMain } from '../components/index';
import articlesStore, { getKeyword } from '../store/articles';

export default class Keyword extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  // eslint-disable-next-line class-methods-use-this,require-await
  async initialize() {
    // eslint-disable-next-line no-restricted-globals
    const { category } = history.state;

    articlesStore.subscribe('keyword', () => {});
    articlesStore.state.keyword = category;

    const keywordNews = await getKeyword(category);

    console.log({ keywordNews, category });

    this.root.appendChild(new KeywordMain({ category: 'hello' }).render('section', 'keyword'));
  }
}
