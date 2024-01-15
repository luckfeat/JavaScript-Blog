import template from '../../templates/Home/carousel.template';
import Component from '../../core/component';
import articlesStore, { getArticles } from '../../store/articles';

articlesStore.subscribe('articles', getArticles);

export default class Carousel extends Component {
  constructor() {
    let articles = articlesStore.articles;
    if (!articles) {
      getArticles();
    }
    super([template, { articles }]);
  }
}
