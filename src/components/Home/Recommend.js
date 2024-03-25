import template from '../../templates/Home/recommend.template';
import articles from '../../templates/Home/recommendNews.template';
import Component from '../../core/component';

export default class Recommend extends Component {
  constructor(data, append = false) {
    if (append) {
      super(articles, data);
    } else {
      super(template, data);
    }
  }
}
