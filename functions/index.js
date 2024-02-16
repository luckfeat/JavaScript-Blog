import * as functions from 'firebase-functions';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, addDoc, getDocs, deleteDoc } from 'firebase/firestore';
// eslint-disable-next-line import/extensions
import config from './config.mjs';

const firebaseConfig = {
  apiKey: config.firebaseKey,
  authDomain: config.autoDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
};
const index = initializeApp(firebaseConfig);
const db = getFirestore(index);

export const postArticles = functions.https.onCall(() => {
  async function getArticlesInBatches() {
    const baseUrl = 'https://gnews.io/api/v4';
    const categories = [
      'general',
      'world',
      'nation',
      'business',
      'technology',
      'entertainment',
      'sports',
      'science',
      'health',
    ];
    const batchSize = 3;
    const apiKeys = [config.apiKey, config.secondApiKey, config.thirdApiKey];

    const date = new Date();
    const today = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;

    async function requestAndPostArticles(baseUrl, category, apiKey) {
      const requestUrl = `${baseUrl}/top-headlines?category=${category}&lang=en&country=us&apikey=${apiKey}`;
      const response = await fetch(requestUrl);

      if (!response.ok) {
        const error = response.status;
        if (error === 400) {
          throw new Error('Bad Request -- Your request is invalid.');
        } else if (error === 401) {
          throw new Error('Unauthorized -- Your API key is wrong.');
        } else if (error === 403) {
          throw new Error('Forbidden -- You have reached your daily quota, the next reset is at 00:00 UTC.');
        } else if (error === 429) {
          throw new Error('Too Many Requests -- You have made more requests per second than you are allowed.');
        } else if (error === 500) {
          throw new Error('Internal Server Error -- We had a problem with our server. Try again later.');
        } else if (error === 503) {
          throw new Error("Service Unavailable -- We're temporarily offline for maintenance. Please try again later.");
        } else {
          throw new Error('An unexpected error occurred.');
        }
      }

      const { articles } = await response.json();

      articles?.forEach(article =>
        setDoc(doc(db, today, article.title), {
          category,
          content: article.content,
          description: article.description,
          image: article.image,
          publishedAt: article.publishedAt,
          source: article.source,
          title: article.title,
          url: article.url,
        }),
      );

      console.log('Request Successful');
    }
    async function fetchArticlesWithRetry(category) {
      for (const apiKey of apiKeys) {
        try {
          // eslint-disable-next-line no-await-in-loop
          await requestAndPostArticles(baseUrl, category, apiKey);
          // if request fails, loop continues
          // if request succeed, loop breaks
          break;
        } catch (error) {
          console.log(error.message);
        }
      }
    }

    for (let i = 0; i < categories.length; i += batchSize) {
      const batch = categories.slice(i, i + batchSize);
      const requestPromises = batch.map(fetchArticlesWithRetry);
      // eslint-disable-next-line no-await-in-loop
      await Promise.all(requestPromises);
      // eslint-disable-next-line no-await-in-loop
      await new Promise(resolve => {
        setTimeout(resolve, 2000);
      });
    }
  }
  async function searchArticlesInBatches() {
    const baseUrl = 'https://gnews.io/api/v4/search';
    const keywords = ['elon', 'meta', 'nft', 'crypto', 'ai', 'youtube', 'korea', 'hiphop', 'programming'];
    const batchSize = 3;
    const apiKeys = [config.apiKey, config.secondApiKey, config.thirdApiKey];
    async function requestAndPostArticles(baseUrl, search, apiKey) {
      const requestUrl = `${baseUrl}/?q=${search}&lang=en&country=us&apikey=${apiKey}`;
      const response = await fetch(requestUrl);

      if (!response.ok) {
        const error = response.status;
        if (error === 400) {
          throw new Error('Bad Request -- Your request is invalid.');
        } else if (error === 401) {
          throw new Error('Unauthorized -- Your API key is wrong.');
        } else if (error === 403) {
          throw new Error('Forbidden -- You have reached your daily quota, the next reset is at 00:00 UTC.');
        } else if (error === 429) {
          throw new Error('Too Many Requests -- You have made more requests per second than you are allowed.');
        } else if (error === 500) {
          throw new Error('Internal Server Error -- We had a problem with our server. Try again later.');
        } else if (error === 503) {
          throw new Error("Service Unavailable -- We're temporarily offline for maintenance. Please try again later.");
        } else {
          throw new Error('An unexpected error occurred.');
        }
      }

      const { articles } = await response.json();

      articles?.forEach(article =>
        setDoc(doc(db, search, article.title), {
          content: article.content,
          description: article.description,
          image: article.image,
          publishedAt: article.publishedAt,
          source: article.source,
          title: article.title,
          url: article.url,
        }),
      );

      console.log(`${search} : successfully loaded`);
    }
    async function fetchArticlesWithRetry(search) {
      for (const apiKey of apiKeys) {
        try {
          // eslint-disable-next-line no-await-in-loop
          await requestAndPostArticles(baseUrl, search, apiKey);
          break;
        } catch (error) {
          console.log('Search Failed');
        }
      }
    }

    for (let i = 0; i < keywords.length; i += batchSize) {
      const batch = keywords.slice(i, i + batchSize);
      const requestPromises = batch.map(fetchArticlesWithRetry);
      // eslint-disable-next-line no-await-in-loop
      await Promise.all(requestPromises);
      // eslint-disable-next-line no-await-in-loop
      await new Promise(resolve => {
        setTimeout(resolve, 1500);
      });
    }
  }
  async function findArticlesByDates() {
    const getWeekDates = () => {
      const dates = [];
      const today = new Date();
      const dayOfWeek = today.getDay(); // 오늘의 요일 인덱스 (일요일 = 0)
      const dayOfMonth = today.getDate();
      const month = today.getMonth() + 1; // 월 (0부터 시작하므로 +1 필요)
      const year = today.getFullYear();

      const differenceToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

      const monday = dayOfMonth + differenceToMonday;
      for (let i = 0; i <= 6; i++) {
        const date = new Date(year, month, monday + i);
        dates.push(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`);
      }

      return dates;
    };
    const baseUrl = 'https://gnews.io/api/v4/search';
    const dates = getWeekDates();
    const batchSize = 3;
    const apiKeys = [config.apiKey, config.secondApiKey, config.thirdApiKey];
    async function requestAndPostArticles(baseUrl, date, apiKey) {
      const requestUrl = `${baseUrl}/?&q=and&from=${''}T20:00:00Z&to=${date}:T24:00:00Z&in=description,content&lang=en&country=us&apikey=${apiKey}`;
      const response = await fetch(requestUrl);

      if (!response.ok) {
        const error = response.status;
        if (error === 400) {
          throw new Error('Bad Request -- Your request is invalid.');
        } else if (error === 401) {
          throw new Error('Unauthorized -- Your API key is wrong.');
        } else if (error === 403) {
          throw new Error('Forbidden -- You have reached your daily quota, the next reset is at 00:00 UTC.');
        } else if (error === 429) {
          throw new Error('Too Many Requests -- You have made more requests per second than you are allowed.');
        } else if (error === 500) {
          throw new Error('Internal Server Error -- We had a problem with our server. Try again later.');
        } else if (error === 503) {
          throw new Error("Service Unavailable -- We're temporarily offline for maintenance. Please try again later.");
        } else {
          throw new Error('An unexpected error occurred.');
        }
      }

      const { articles } = await response.json();

      articles?.forEach(article =>
        setDoc(doc(db, `date-${date}`, article.title), {
          content: article.content,
          description: article.description,
          image: article.image,
          publishedAt: article.publishedAt,
          source: article.source,
          title: article.title,
          url: article.url,
        }),
      );
    }
    async function fetchArticlesWithRetry(search) {
      for (const apiKey of apiKeys) {
        try {
          // eslint-disable-next-line no-await-in-loop
          await requestAndPostArticles(baseUrl, search, apiKey);
          break;
        } catch (error) {
          console.log('Date Search Failed');
        }
      }
    }

    for (let i = 0; i < dates.length; i += batchSize) {
      const batch = dates.slice(i, i + batchSize);
      const requestPromises = batch.map(fetchArticlesWithRetry);
      // eslint-disable-next-line no-await-in-loop
      await Promise.all(requestPromises);
      // eslint-disable-next-line no-await-in-loop
      await new Promise(resolve => {
        setTimeout(resolve, 1500);
      });
    }
  }

  getArticlesInBatches();
  searchArticlesInBatches();
  findArticlesByDates();
});
export const deleteCollection = functions.https.onCall(() => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const collectionName = `${yesterday.getFullYear()}.${yesterday.getMonth() + 1}.${yesterday.getDate()}`;
  async function deleteQueryBatch(db, query, resolve) {
    const snapshot = await getDocs(collection(db, collectionName));
    const batchSize = snapshot.size;

    if (batchSize === 0) {
      resolve();
      return;
    }
    snapshot.docs.forEach(doc => {
      deleteDoc(doc.ref);
    });
  }
  function clearCollection(db) {
    const collectionRef = collection(db, collectionName);

    return new Promise((resolve, reject) => {
      deleteQueryBatch(db, collectionRef, resolve).catch(reject);
    });
  }

  return clearCollection(db);
});
