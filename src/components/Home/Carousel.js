import template from '../../templates/Home/carousel.template';
import Component from '../../core/component';
import articlesStore, { updateArticles } from '../../store/articles';

articlesStore.subscribe('articles', updateArticles);

export default class Carousel extends Component {
  constructor(data) {
    super(template, data);
  }
}
