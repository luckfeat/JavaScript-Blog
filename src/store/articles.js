import Store from '../core/store';
import fetchArticles from '../core/api/newsApi';

const store = new Store({
    articles: [],
    page: 1
});

export async function loadArticles() {
    try {
        let {articles} = await fetchArticles();
        store.state.articles = articles
        return articles
    } catch (err) {
        console.error(err);
    }
}

export async function loadNextArticles() {
    try {
        store.state.page++
        let {articles} = await fetchArticles(true);
        store.state.articles = articles
        return articles
    } catch (err) {
        console.error(err);
    }
}

export default store;
