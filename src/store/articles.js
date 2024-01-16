import Store from '../core/store';
import fetchArticles from '../core/api/newsApi';

const store = new Store({
  articles: [],
});

export async function updateArticles() {
  try {
    let { articles } = await fetchArticles();
    console.log('save')
    store.state.articles = articles
    return articles
  } catch (err) {
    console.error(err);
  }
}

export default store;
