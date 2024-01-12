import template from '../../templates/input.template';
import Component from '../../core/component';

import messageStore from '../../store/message';

let { state } = messageStore;

export default class Input extends Component {
  constructor() {
    super({ template, state });
    this.listen();
    messageStore.subscribe('message', () => {
      console.log('Input');
    });
  }

  listen() {
    document.addEventListener('input', (event) => {
      if (event.target.classList.contains('title')) {
        state.message = event.target.value;
      }
    });
  }
}
