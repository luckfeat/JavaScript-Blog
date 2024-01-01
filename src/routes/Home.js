import Component from '../core/component';
import { Footer, Header } from '../components';

export default class Home extends Component {
  constructor() {
    super();
    this.root = document.querySelector('#root');
  }

  append(component) {
    this.root.appendChild(component);
  }

  initialize() {
    /**
     * forEach 사용해서 반복 코드 줄이기
     *  */
    this.append(new Header().render('header'));
    this.append(new Footer().render('footer'));
  }
}
