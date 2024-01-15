import template from '../../templates/Home/carousel.template';
import Component from '../../core/component';
import articles from '../../store/articles';

console.log(articles);

export default class Carousel extends Component {
  constructor() {
    super({ template, articles });
  }
}
