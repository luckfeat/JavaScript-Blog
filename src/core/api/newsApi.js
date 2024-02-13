import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, setDoc, collection, doc, deleteDoc } from 'firebase/firestore';
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
const deleteCollection = httpsCallable(functions, 'deleteCollection');

export async function getArticles() {
  const querySnapshot = await getDocs(collection(db, 'Articles'));

  return querySnapshot;
}
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
export async function updateArticles() {
  if (await checkForUpdate()) {
    /* when update is true, delete remaining collection and update articles */
    await deleteCollection();
    await postArticles();
  }
}
export default async function searchArticles(keyword = '') {
  const baseUrl = 'https://gnews.io/api/v4';
  const { apiKey } = config;
  const category = keyword;

  const requestUrl = `${baseUrl}/top-headlines?category=${category}&lang=en&country=us&expand=content&apikey=${apiKey}`;

  try {
    const response = await fetch(requestUrl);

    return await response.json();
  } catch (error) {
    console.error('기사를 불러오는 데 실패했습니다.', error);
    throw error;
  }
}
