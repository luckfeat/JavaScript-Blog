import Component from '../core/component';
import { Detail } from '../components';

export default class Article extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  // eslint-disable-next-line class-methods-use-this
  initialize() {
    // eslint-disable-next-line no-restricted-globals
    this.root.appendChild(new Detail().render('section', 'article'));
  }
}
