import template from './templates/app.template';
import Component from './core/component';
import Nav from './components/Nav';

export default class App extends Component {
  constructor() {
    super({ template });
    this.root = document.querySelector('#root');
  }

  append(component) {
    this.root.appendChild(component);
  }

  start() {
    /**
     * forEach 사용해서 반복 코드 줄이기
     *  */
    this.append(this.render());
    this.append(new Nav().render());
  }
}
