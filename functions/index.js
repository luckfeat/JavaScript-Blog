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

export const postArticles = functions.https.onCall((search = false) => {
  async function sendRequestsInBatches() {
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
    const apiKeys = [config.secondApiKey, config.apiKey];
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
        setDoc(doc(db, 'Articles', article.title), {
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
        setTimeout(resolve, 1500);
      });
    }
  }
  async function searchRequestsInBatches(search) {
    const baseUrl = 'https://gnews.io/api/v4';
    const batchSize = 3;
    const apiKeys = [config.secondApiKey, config.apiKey];
    async function requestAndPostArticles(baseUrl, search, apiKey) {
      const requestUrl = `${baseUrl}/top-headlines?search=${search}&lang=en&country=us&apikey=${apiKey}`;
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

      console.log('Request Successful');
    }
    async function fetchArticlesWithRetry(search) {
      for (const apiKey of apiKeys) {
        try {
          // eslint-disable-next-line no-await-in-loop
          await requestAndPostArticles(baseUrl, search, apiKey);
          break;
        } catch (error) {
          console.log(error.message);
        }
      }
    }
  }

  if (search) {
    searchRequestsInBatches(); /* Categories - Search(Keywords) 대체 */
  } else {
    sendRequestsInBatches();
  }
});
export const deleteCollection = functions.https.onCall(() => {
  async function deleteQueryBatch(db, query, resolve) {
    const snapshot = await getDocs(collection(db, 'Articles'));
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
    const collectionRef = collection(db, 'Articles');

    return new Promise((resolve, reject) => {
      deleteQueryBatch(db, collectionRef, resolve).catch(reject);
    });
  }

  return clearCollection(db);
});
