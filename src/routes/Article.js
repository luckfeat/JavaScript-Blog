import Component from '../core/component';
import { Aritlce } from '../components';

export default class Article extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  // eslint-disable-next-line class-methods-use-this
  initialize() {
    this.root.appendChild(new Aritlce().render('section'));
  }
}
