import Component from '../core/component';
import { KeywordMain } from '../components/index';
import { renderKeywordNews } from '../store/articles';

export default class Keyword extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  // eslint-disable-next-line class-methods-use-this,require-await
  async initialize() {
    // eslint-disable-next-line no-restricted-globals
    const { category } = history.state;
    const keywordNews = await renderKeywordNews(category);

    this.root.appendChild(new KeywordMain({ keywordNews, category }).render('section', 'keyword-main'));
  }
}
