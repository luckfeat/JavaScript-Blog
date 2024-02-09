import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, setDoc, collection, doc, addDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import config from '../../../config';

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

const functions = getFunctions();
const postArticles = httpsCallable(functions, 'postArticles');

export async function getArticles() {
  const querySnapshot = await getDocs(collection(db, 'Articles'));

  console.log(querySnapshot);

  return querySnapshot;
}

// eslint-disable-next-line require-await
export async function checkForUpdate() {
  const updatedTime = new Date((await getDocs(collection(db, 'Update'))).docs[0].data().updatedTime.seconds * 1000);
  const currentTime = new Date();
  const timeDifference = (currentTime - updatedTime) / (1000 * 60 * 60 * 24);
  if (timeDifference >= 0.25) {
    await setDoc(doc(db, 'Update', 'Update'), {
      updatedTime: new Date(),
    });
    console.log('Update Time');
    return true;
  }
  console.log('Update Not Necessary');
  return false;
}

export default async function fetchArticles(search = false, keyword = '', increment = false, pageNumber = 1) {
  const baseUrl = 'https://gnews.io/api/v4';
  const { apiKey } = config;
  const category = 'technology';
  const max = 25;
  const page = increment ? pageNumber : 1;

  const requestUrl = { url: '' };

  if (!search) {
    requestUrl.url = `${baseUrl}/top-headlines?category=${category}&lang=en&country=us&expand=content&max=${max}&page=${page}&apikey=${apiKey}`;
  } else {
    requestUrl.url = `${baseUrl}/search?q=${keyword}&lang=en&country=us&expand=content&max=${max}&apikey=${apiKey}`;
  }

  try {
    const response = await fetch(requestUrl.url);
    return await response.json();
  } catch (error) {
    console.error('기사를 불러오는 데 실패했습니다.', error);
    throw error;
  }
}

console.log('News');
