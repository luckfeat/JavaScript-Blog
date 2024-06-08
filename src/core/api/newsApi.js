import { initializeApp } from 'firebase/app';
import { collection, doc, getFirestore, getDoc, getDocs, limit, query, where, setDoc } from 'firebase/firestore';
// eslint-disable-next-line import/no-extraneous-dependencies
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

export function getToday() {
  const formatDate = date => `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
  const today = new Date();
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  const todayCollection = formatDate(today);
  const yesterdayCollection = formatDate(yesterday);

  return [todayCollection, yesterdayCollection];
}
export async function getTodayNews() {
  const [todayCollection, yesterdayCollection] = getToday();
  let querySnapshot = await getDocs(collection(db, todayCollection));

  querySnapshot = querySnapshot.docs.length
    ? await getDocs(collection(db, todayCollection))
    : await getDocs(collection(db, yesterdayCollection));

  return querySnapshot;
}
export async function getTodayNewsExtended() {
  const [todayCollection] = getToday();
  const fireStoreQuery = await query(collection(db, todayCollection), where('success', '==', true));
  const todayNewsExtended = await getDocs(fireStoreQuery);

  return todayNewsExtended;
}
export async function getYesterdayNews() {
  const [todayCollection, yesterdayCollection] = getToday();
  let querySnapshot = await getDocs(collection(db, yesterdayCollection));

  querySnapshot = querySnapshot.docs.length
    ? await getDocs(collection(db, yesterdayCollection))
    : await getDocs(collection(db, todayCollection));

  return querySnapshot;
}
export async function getYesterdayNewsExtended() {
  const [, yesterdayCollection] = getToday();
  const fireStoreQuery = await query(collection(db, yesterdayCollection), where('success', '==', true));
  const yesterdayNewsExtended = await getDocs(fireStoreQuery);

  return yesterdayNewsExtended;
}
export async function getYesterdayNewsExtendedWithLimit() {
  const [, yesterdayCollection] = getToday();
  const fireStoreQuery = await query(collection(db, yesterdayCollection), where('success', '==', true), limit(6));
  const yesterdayNewsExtendedWithLimit = await getDocs(fireStoreQuery);

  return yesterdayNewsExtendedWithLimit;
}
export async function getNewsDetail(title, data) {
  try {
    if (data) {
      const docRef = doc(db, data, title);
      const querySnapshot = await getDoc(docRef);

      return querySnapshot.data();
    }

    /* Is it necessary to use getToady function? Could it be replaced by date parameter */

    const [todayCollection, yesterdayCollection] = getToday();

    const documentData =
      (await getDoc(doc(db, todayCollection, title))).data() ||
      (await getDoc(doc(db, yesterdayCollection, title))).data();

    return documentData;
  } catch (err) {
    console.error(err.message);
  }
}
export async function getKeywordNews(category) {
  const querySnapshot = await getDocs(collection(db, category));

  return querySnapshot;
}
export async function getKeywordNewsWithLimit(category) {
  const fireStoreQuery = await query(collection(db, category), limit(101));
  const dateNews = getDocs(fireStoreQuery);

  return dateNews;
}
export async function getKeywordNewsWithLimitTwenty(category) {
  const fireStoreQuery = await query(collection(db, category), limit(21));
  const dateNews = getDocs(fireStoreQuery);

  return dateNews;
}
export async function getDateNews(date) {
  const querySnapshot = await getDocs(collection(db, date));

  return querySnapshot;
}
export async function getDateNewsWithLimit(date) {
  const fireStoreQuery = await query(collection(db, date), limit(8));
  const dateNews = getDocs(fireStoreQuery);

  return dateNews;
}
