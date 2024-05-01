import Store from '../core/store';
import {
  getNewsDetail,
  getTodayNews,
  getKeywordNews,
  getKeywordNewsWithLimit,
  getYesterdayNews,
  getDateNews,
  getDateNewsWithLimit,
  getYesterdayNewsExtended,
  getTodayNewsExtended,
} from '../core/api/newsApi';

const articlesStore = new Store({
  articles: [],
  article: {},
  keyword: {},
});

const getFireStoreData = querySnapshot => {
  const news = [];

  querySnapshot.forEach(doc => {
    const firestoreDataObj = doc.data();
    firestoreDataObj.id = doc.id;

    news.push(firestoreDataObj);
  });

  return news;
};

export async function renderTodayNews() {
  try {
    const querySnapshot = await getTodayNews();

    return getFireStoreData(querySnapshot);
  } catch (err) {
    console.error(err);
  }
}
export async function renderTodayNewsExtended() {
  try {
    const querySnapshot = await getTodayNewsExtended();

    return getFireStoreData(querySnapshot);
  } catch (err) {
    console.error(err);
  }
}
export async function renderYesterdayNews() {
  try {
    const querySnapshot = await getYesterdayNews();

    return getFireStoreData(querySnapshot);
  } catch (err) {
    console.error(err);
  }
}
export async function renderYesterdayNewsExtended() {
  try {
    const querySnapshot = await getYesterdayNewsExtended();

    return getFireStoreData(querySnapshot);
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
      const news = doc.data();
      news.id = doc.id;

      articlesStore.state[category].push(news);
    });

    return articlesStore.state[category];
  } catch (err) {
    console.error(err);
  }
}
export async function renderKeywordNewsWithLimit(category) {
  try {
    const querySnapshot = await getKeywordNewsWithLimit(category);
    articlesStore.state[category] = [];

    querySnapshot.forEach(doc => {
      const news = doc.data();
      news.id = doc.id;

      articlesStore.state[category].push(news);
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
      const news = doc.data();
      news.id = doc.id;

      articlesStore.state[date].push(news);
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
      const news = doc.data();
      news.id = doc.id;

      articlesStore.state[date].push(news);
    });

    return articlesStore.state[date];
  } catch (err) {
    console.error(err);
  }
}
export default articlesStore;
