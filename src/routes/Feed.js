import Component from '../core/component';
import { Input, Text } from '../components';

export default class Feed extends Component {
  constructor() {
    super();
    this.root = document.querySelector('#root');
  }

  append(component) {
    this.root.appendChild(component);
  }

  initialize() {
    this.append(new Input().render('section'));
    this.append(new Text().render('section'));
  }
}
