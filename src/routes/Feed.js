import template from '../templates/feed.template';
import Component from '../core/component';

export default class Feed extends Component {
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
  }
}
