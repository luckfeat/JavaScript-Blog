import Store from '../core/store';
import {
  getNewsDetail,
  getTodayNews,
  getKeywordNews,
  getKeywordNewsWithLimit,
  getYesterdayNews,
  getDateNews,
  getDateNewsWithLimit,
  getKeywordNewsWithLimitTwenty,
  getYesterdayNewsExtended,
  getYesterdayNewsExtendedWithLimit,
  getTodayNewsExtended,
} from '../core/api/newsApi';

const articlesStore = new Store({
  articles: [],
  article: {},
  keyword: {},
  trend: {},
  prev: {},
  next: {},
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
export async function renderYesterdayNewsExtendedWithLimit() {
  try {
    const querySnapshot = await getYesterdayNewsExtendedWithLimit();

    return getFireStoreData(querySnapshot);
  } catch (err) {
    console.error(err);
  }
}
// eslint-disable-next-line require-await
export function renderNewsDetail(title, data) {
  const newsDetail = getNewsDetail(title, data);

  return newsDetail;
}
export async function renderKeywordNews(category) {
  try {
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
    // articlesStore.state[category] = [];
    const keywordNewsWithLimit = [];

    querySnapshot.forEach(doc => {
      const news = doc.data();
      news.id = doc.id;

      keywordNewsWithLimit.push(news);
    });

    return keywordNewsWithLimit;
  } catch (err) {
    console.error(err);
  }
}
export async function renderKeywordNewsWithLimitTwenty(category) {
  try {
    const querySnapshot = await getKeywordNewsWithLimitTwenty(category);
    // articlesStore.state[category] = [];
    const keywordNewsWithLimit = [];

    querySnapshot.forEach(doc => {
      const news = doc.data();
      news.id = doc.id;

      keywordNewsWithLimit.push(news);
    });

    return keywordNewsWithLimit;
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
    // articlesStore.state[date] = [];

    const dateNewsWithLimit = [];

    querySnapshot.forEach(doc => {
      const news = doc.data();
      news.id = doc.id;

      dateNewsWithLimit.push(news);
    });

    return dateNewsWithLimit;
  } catch (err) {
    console.error(err);
  }
}
export default articlesStore;
