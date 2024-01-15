import Store from '../core/store';
import fetchNewsFeed from '../core/api/newsApi';

async function getArticles() {
  try {
    let { articles } = await fetchNewsFeed();
    const newsStore = new Store({
      articles,
    });
    return newsStore;
  } catch (err) {
    console.error(err);
  }
}

export default getArticles();
