import config from '../../../config.mjs';

export default async function fetchNewsFeed() {
  const baseUrl = 'https://gnews.io/api/v4/top-headlines';
  const category = 'technology';
  const apiKey = config.apiKey;
  const requestUrl = `${baseUrl}?category=${category}&lang=en&country=us&expand=content&apikey=${apiKey}`;

  let response = await fetch(requestUrl);
  let data = await response.json();

  return data;
}
