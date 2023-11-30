import template from './templates/app.template';
import Component from './core/component';

export default class App extends Component {
  constructor({ tagName, state }) {
    super({ template: template, tagName, state });
  }
}
