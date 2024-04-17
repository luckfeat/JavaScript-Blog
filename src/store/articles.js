import Store from '../core/store';
import {
  getNewsDetail,
  getTodayNews,
  getKeywordNews,
  getYesterdayNews,
  getDateNews,
  getDateNewsWithLimit,
} from '../core/api/newsApi';

const articlesStore = new Store({
  articles: [],
  article: {},
  keyword: {},
});

export async function renderNews() {
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
export async function renderYesterdayNews() {
  try {
    const news = [];
    const querySnapshot = await getYesterdayNews();
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
export function renderNewsDetail(title, data) {
  return getNewsDetail(title, data);
}
export async function renderKeywordNews(category) {
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
export async function renderDateNews(date) {
  try {
    const querySnapshot = await getDateNews(date);
    articlesStore.state[date] = [];
    querySnapshot.forEach(doc => {
      articlesStore.state[date].push(doc.data());
    });

    return articlesStore.state[date];
  } catch (err) {
    console.error(err);
  }
}
export async function renderDateNewsWithLimit(date) {
  try {
    const querySnapshot = await getDateNewsWithLimit(date);
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
