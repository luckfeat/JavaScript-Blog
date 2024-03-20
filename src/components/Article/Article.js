import template from '../../templates/Article/article.template';
import Component from '../../core/component';

export default class Article extends Component {
  constructor(data) {
    super(template, data);
  }
}
