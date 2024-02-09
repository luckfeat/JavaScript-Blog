import Store from '../core/store';
import fetchArticles, { checkForArticles } from '../core/api/News';

const store = new Store({
  articles: [],
  page: 1,
});

export async function loadArticles() {
  try {
    const { articles } = await fetchArticles();
    store.state.articles = articles;
    return articles;
  } catch (err) {
    alert(err);
  }
}

export async function loadNextArticles() {
  try {
    store.state.page++;
    const { articles } = await fetchArticles(null, false, true, store.state.page);
    store.state.articles = articles;
    return articles;
  } catch (err) {
    alert(err);
  }
}

export async function searchArticles(keyword) {
  try {
    const { articles } = await fetchArticles(true, keyword, false);
    store.state.articles = articles;

    return articles;
  } catch (err) {
    alert(err);
  }
}

export default store;
