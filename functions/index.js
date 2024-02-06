import * as functions from 'firebase-functions';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, addDoc } from 'firebase/firestore';
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

export const helloWorld = functions.https.onRequest((request, response) => {
  const message = 'Hello, World';

  response.send(`<h1>${message}</h1>`);
});

export const helloUser = functions.auth.user().onCreate(user =>
  setDoc(doc(db, 'Articles', user.uid), {
    email: user.email,
  }),
);

export const postArticles = functions.https.onCall(async (data, context) => {
  const baseUrl = 'https://gnews.io/api/v4';
  const { apiKey } = config;
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

  try {
    const promises = categories.map(async category => {
      const requestUrl = `${baseUrl}/top-headlines?category=${category}&lang=en&country=us&expand=content&apikey=${apiKey}`;
      const response = await fetch(requestUrl);
      const articles = await response.json();

      const articlePromises = articles.map(async article => {
        await addDoc(collection(db, 'Articles'), {
          content: article.content,
          description: article.description,
          image: article.image,
          publishedAt: article.publishedAt,
          source: article.source,
          title: article.title,
          url: article.url,
        });
      });

      return Promise.all(articlePromises);
    });

    return await Promise.all(promises);
  } catch (error) {
    throw new functions.https.HttpsError('unknown', 'Something went wrong');
  }
});

function sendRequestsInBatches() {
  async function requestArticles(baseUrl, category, apiKey) {
    const requestUrl = `${baseUrl}/top-headlines?category=${category}&lang=en&country=us&apikey=${apiKey}`;
    const response = await fetch(requestUrl);

    if (!response.ok) {
      throw new Error();
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
  }

  const baseUrl = 'https://gnews.io/api/v4';
  const categories = [
    'general',
    'world',
    'nation',
    'business',
    // 'technology',
    // 'entertainment',
    // 'sports',
    // 'science',
    // 'health',
  ];
  const batchSize = 3;
  const results = [];

  for (let i = 0; i < categories.length; i += batchSize) {
    const batch = categories.slice(i, i + batchSize);
    batch.forEach(async category => {
      try {
        await requestArticles(baseUrl, category, config.secondApiKey);
      } catch (error) {
        console.error(error);
      }
    });
  }

  return results;
}

// async function test() {
//   const baseUrl = 'https://gnews.io/api/v4';
//   const { apiKey } = config;
//   const categories = [
//     'general',
//     'world',
//     'nation',
//     'business',
//     'technology',
//     'entertainment',
//     'sports',
//     'science',
//     'health',
//   ];
//
//   try {
//     const batchSize = 3; // 각 배치의 크기를 정의
//     const results = []; // 결과를 저장할 배열 선언
//
//     const promises = categories.map(async category => {
//       const requestUrl = `${baseUrl}/top-headlines?category=${category}&lang=en&country=us&expand=content&apikey=${apiKey}`;
//       const response = await fetch(requestUrl);
//       const { articles } = await response.json();
//
//       const articlePromises = articles.map(async article => {
//         await setDoc(doc(db, 'Articles', article.title), {
//           content: article.content,
//           description: article.description,
//           image: article.image,
//           publishedAt: article.publishedAt,
//           source: article.source,
//           title: article.title,
//           url: article.url,
//         });
//       });
//
//       return Promise.all(articlePromises);
//     });
//
//     return await Promise.all(promises);
//   } catch (error) {
//     throw new Error(error);
//   }
// }
sendRequestsInBatches();
