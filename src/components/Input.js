import template from '../templates/input.template';
import Component from '../core/component';
import messageStore from '../store/message';

let { state } = messageStore;

export default class Input extends Component {
  constructor() {
    super({ template, state });
    this.domLoaded(this.listen);
  }

  listen() {
    const inputEl = document.querySelector('.title');
    inputEl.addEventListener('input', () => {
      state.message = inputEl.value;
    });
  }
}
