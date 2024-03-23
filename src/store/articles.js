import Store from '../core/store';
import { getNewsDetail, getTodayNews, getKeywordNews } from '../core/api/newsApi';

const articlesStore = new Store({
  articles: [],
  article: {},
  keyword: {},
});

export async function getArticles() {
  try {
    const news = [];
    const querySnapshot = await getTodayNews();
    querySnapshot.forEach(doc => {
      // articlesStore.state.articles.push(doc.data());
      news.push(doc.data());
    });

    // return articlesStore.state.articles;
    return news;
  } catch (err) {
    console.error(err);
  }
}

// eslint-disable-next-line require-await
export function getDetail(title, category) {
  return getNewsDetail(title, category);
}

export async function getKeyword(category) {
  try {
    articlesStore.state = {};
    const querySnapshot = await getKeywordNews(category);
    articlesStore.state[category] = [];
    querySnapshot.forEach(doc => {
      articlesStore.state[category].push(doc.data());
    });

    return articlesStore.state[category];
  } catch (err) {
    console.error(err);
  }
}

export async function getDate(date) {
  try {
    const querySnapshot = await getKeywordNews(date);
    articlesStore.state[date] = [];
    querySnapshot.forEach(doc => {
      articlesStore.state[date].push(doc.data());
    });

    return articlesStore.state[date];
  } catch (err) {
    console.error(err);
  }
}

export default articlesStore;
