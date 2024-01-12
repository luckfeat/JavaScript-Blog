import Store from '../core/store';
import fetchNewsFeed from '../core/api/newsApi';

async function getNews() {
  let news = await fetchNewsFeed();
  console.log(news);
}

getNews();

export default new Store({
  news: null,
});
