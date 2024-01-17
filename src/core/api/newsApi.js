import config from '../../../config.mjs';
import articlesStore from '../../store/articles.js'

export default async function fetchArticles(increment) {
    const baseUrl = 'https://gnews.io/api/v4/top-headlines';
    const apiKey = config.apiKey;
    const category = 'technology';
    const max = 25;
    const page = increment ? articlesStore.state.page : 1
    const requestUrl = `${baseUrl}?category=${category}&lang=en&country=us&expand=content&max=${max}&page=${page}&apikey=${apiKey}`;
    try {
        const response = await fetch(requestUrl);
        return await response.json();
    } catch (error) {
        console.error('기사를 불러오는 데 실패했습니다.', error);
        throw error;
    }
}