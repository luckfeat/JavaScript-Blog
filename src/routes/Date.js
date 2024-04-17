import Component from '../core/component';
import { DateMain } from '../components/index';
import { renderDateNews } from '../store/articles';

export default class Keyword extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  // eslint-disable-next-line class-methods-use-this,require-await
  async initialize() {
    // eslint-disable-next-line no-restricted-globals
    const { date } = history.state;
    const dateNews = await renderDateNews(date);
    this.root.appendChild(new DateMain({ dateNews, date }).render('section', 'date'));
  }
}
