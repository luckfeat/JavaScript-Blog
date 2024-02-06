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
  const apiKey = 'AIzaSyBF0GSEDU9w1ELPgTRCx9b_ZNnT6rM8OlE';
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

      await Promise.all(articlePromises);
    });

    return await Promise.all(promises);
  } catch (error) {
    throw new functions.https.HttpsError('unknown', 'Something went wrong');
  }
});
