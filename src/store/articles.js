import Store from '../core/store';
import { getTodayNews } from '../core/api/newsApi';

const articlesStore = new Store({
  articles: [],
  article: {},
});

export async function getArticles() {
  try {
    const querySnapshot = await getTodayNews();
    querySnapshot.forEach(doc => {
      articlesStore.state.articles.push(doc.data());
    });

    return articlesStore.state.articles;
  } catch (err) {
    console.error(err);
  }
}

export default articlesStore;
