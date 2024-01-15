import config from '../../../config.mjs';

export default async function fetchArticles() {
  const baseUrl = 'https://gnews.io/api/v4/top-headlines';
  const apiKey = config.apiKey;
  const category = 'technology';
  const max = 25;
  const requestUrl = `${baseUrl}?category=${category}&lang=en&country=us&expand=content&max=${max}&apikey=${apiKey}`;

  let response = await fetch(requestUrl);
  let data = await response.json();

  return data;
}
