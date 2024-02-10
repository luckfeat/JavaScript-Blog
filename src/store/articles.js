import Store from '../core/store';
import fetchArticles, { getArticles, checkForArticles } from '../core/api/News';
import articles from './articles.js';

const articlesStore = new Store({
  articles: [],
});

export async function saveArticles() {
  try {
    const querySnapshot = await getArticles();
    querySnapshot.forEach(doc => {
      articlesStore.state.articles.push(doc.data());
    });

    return articlesStore.state.articles;
  } catch (err) {
    console.error(err);
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

export default articlesStore;
