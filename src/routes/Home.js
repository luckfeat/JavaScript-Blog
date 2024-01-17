import Component from '../core/component';
import {Nav, Header, Carousel, Footer} from '../components';
import articlesStore, {updateArticles} from '../store/articles.js';

articlesStore.subscribe('articles', () => {
});

export default class Home extends Component {
    constructor() {
        super();
        this.root = document.querySelector('#root');
        this.button = document.createElement('button');
        this.button.textContent = 'Refresh';
        this.carousel = null;
        this.loadArticles().then((articles) => {
            this.replaceElement(this.carousel, new Carousel(articles).render('section'))
        })
    }

    appendMany(components) {
        components.forEach(component => {
            this.root.appendChild(component);
        })
    }

    replaceElement(oldElement, newElement) {
        oldElement.parentNode.insertBefore(newElement, oldElement.nextSibling)
        oldElement.parentNode.removeChild(oldElement)
    }

    initialize() {
        const nav = new Nav().render('nav')
        const header = new Header().render('header')
        const carousel = new Carousel().render('section')
        const footer = new Footer().render('footer')

        this.carousel = carousel
        this.appendMany([nav, header, carousel, footer])
    }

    async loadNotice() {

    }

    async loadArticles() {
        return await updateArticles()
    }
}
