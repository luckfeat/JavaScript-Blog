import Component from '../core/component';
import { Header, Carousel, Footer } from '../components';

export default class Home extends Component {
  constructor() {
    super();
    this.root = document.querySelector('#root');
    this.button = document.createElement('button');
    this.button.textContent = 'Refresh';
    this.updateCarousel();
  }

  append(component) {
    this.root.appendChild(component);
  }

  initialize() {
    /**
     * forEach 사용해서 반복 코드 줄이기
     *  */
    this.append(new Header().render('header'));
    this.append(this.button);
    this.append(new Carousel().render('section'));
    this.append(new Footer().render('footer'));
  }

  updateCarousel() {
    this.button.addEventListener('click', () => {
      this.root.innerHTML = '';
      this.initialize();
    });
  }
}
