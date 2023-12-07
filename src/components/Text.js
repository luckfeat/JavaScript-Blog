import template from '../templates/text.template';
import Component from '../core/component';
import messageStore from '../store/message';

const { state } = messageStore;

export default class Text extends Component {
  constructor() {
    super({ template, state });
    messageStore.subscribe('message', this.overWrite);
  }

  overWrite() {
    const textEl = document.querySelector('.text-field');
    textEl.innerHTML = `${state.message}`;
  }
}
