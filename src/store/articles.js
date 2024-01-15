import Store from '../core/store';
import fetchArticles from '../core/api/newsApi';

const store = new Store({
  articles: null,
});

export async function updateArticles() {
  try {
    console.log(store)
    let { articles } = await fetchArticles();
    store.articles = articles;
    console.log(store)
    return articles
  } catch (err) {
    console.error(err);
  }
}

export default store;
