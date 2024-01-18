import config from '../../../config.mjs';
import articlesStore from '../../store/articles.js'

export default async function fetchArticles(increment = false, search = false, keyword) {
    const baseUrl = 'https://gnews.io/api/v4';
    const apiKey = config.apiKey;
    const category = 'technology';
    const max = 25;
    const page = increment ? articlesStore.state.page : 1

    const requestUrl = {url: ''};

    if (!search) {
        requestUrl.url = `${baseUrl}/top-headlines?category=${category}&lang=en&country=us&expand=content&max=${max}&page=${page}&apikey=${apiKey}`;
    } else {
        requestUrl.url = `${baseUrl}/search?q=${keyword}&apikey=${apiKey}`;
    }

    try {
        const response = await fetch(requestUrl.url);
        return await response.json();
    } catch (error) {
        console.error('기사를 불러오는 데 실패했습니다.', error);
        throw error;
    }
}