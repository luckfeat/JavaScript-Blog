import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, setDoc, collection, doc } from 'firebase/firestore';
// import { getFunctions, httpsCallable } from 'firebase/functions';
import config from '../../../config';

const firebaseConfig = {
  firebaseKey: config.firebaseKey,
  authDomain: config.autoDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
};
const index = initializeApp(firebaseConfig);
const db = getFirestore(index);
// const functions = getFunctions();
// const postArticles = httpsCallable(functions, 'postArticles');
// const deleteCollection = httpsCallable(functions, 'deleteCollection');

export async function getTodayNews() {
  const formatDate = date => `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
  const today = new Date();
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  const todayCollection = formatDate(today);
  const yesterdayCollection = formatDate(yesterday);

  let querySnapshot = await getDocs(collection(db, todayCollection));

  querySnapshot = querySnapshot.docs.length
    ? await getDocs(collection(db, todayCollection))
    : await getDocs(collection(db, yesterdayCollection));

  return querySnapshot;
}
export async function getKeywordNews() {}
export async function checkForUpdate() {
  const updatedTime = new Date((await getDocs(collection(db, 'Update'))).docs[0].data().updatedTime.seconds * 1000);
  const currentTime = new Date();
  const timeDifference = (currentTime - updatedTime) / (1000 * 60 * 60 * 24);
  if (timeDifference >= 0.25) {
    await setDoc(doc(db, 'Update', 'Update'), {
      updatedTime: new Date(),
    });
    return true;
  }
  return false;
}

export const test = () => {
  async function getArticlesInBatches() {
    const baseUrl = 'https://gnews.io/api/v4';
    const categories = [
      'general',
      // 'world',
      // 'nation',
      // 'business',
      // 'technology',
      // 'entertainment',
      // 'sports',
      // 'science',
      // 'health',
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

      function chunkArray(array, size) {
        const chunkedArr = [];
        const copied = [...array];
        const numOfChild = Math.ceil(copied.length / size);
        for (let i = 0; i < numOfChild; i++) {
          chunkedArr.push(copied.splice(0, size));
        }
        return chunkedArr;
      }

      const articleGroups = chunkArray(articles, 10);

      articleGroups.forEach((group, index) => {
        const pageNumber = index + 1; // 페이지 번호 (1부터 시작)
        setDoc(doc(db, today, 'pageNumber', `${pageNumber}`, 'Articles'), { articles });
      });
    }
    async function fetchArticlesWithRetry(category) {
      for (const apiKey of apiKeys) {
        try {
          // eslint-disable-next-line no-await-in-loop
          await requestAndPostArticles(baseUrl, category, apiKey);
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
  getArticlesInBatches();
};

test();
