import Store from '../core/store';
import fetchNewsFeed from '../core/api/newsApi';

const store = new Store({
  articles: null,
});

export async function getArticles() {
  try {
    let { articles } = await fetchNewsFeed();
    store.articles = articles;
  } catch (err) {
    console.error(err);
  }
}

export default store;
