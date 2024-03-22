import Store from '../core/store';
import { getNewsDetail, getTodayNews, getKeywordNews } from '../core/api/newsApi';

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

// eslint-disable-next-line require-await
export function getDetail(title) {
  return getNewsDetail(title);
}

export async function getKeyword(category) {
  try {
    const querySnapshot = await getKeywordNews(category);
    console.log(querySnapshot);
    articlesStore.state[category] = [];
    querySnapshot.forEach(doc => {
      articlesStore.state[category].push(doc.data());
    });

    return articlesStore.state[category];
  } catch (err) {
    console.error(err);
  }
}

export default articlesStore;
