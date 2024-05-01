import { initializeApp } from 'firebase/app';
import {
  collection,
  doc,
  getFirestore,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
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
export async function getNewsDetail(title, data) {
  const [todayCollection, yesterdayCollection] = getToday();

  console.log(title);

  try {
    const searchTitle = decodeURIComponent(title);

    if (data) {
      const docRef = doc(db, data, searchTitle);
      const querySnapshot = await getDoc(docRef);

      return querySnapshot.data();
    }

    const documentData =
      (await getDoc(doc(db, todayCollection, searchTitle))).data() ||
      (await getDoc(doc(db, yesterdayCollection, searchTitle))).data();

    console.log(searchTitle);
    console.log(`"${searchTitle}"`);

    console.log(
      (
        await getDoc(
          doc(
            db,
            yesterdayCollection,
            "'Avengelyne' Starring Margot Robbie & Directed By Olivia Wilde Sold To Warners",
          ),
        )
      ).data(),
    );

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
export async function getDateNews(date) {
  const querySnapshot = await getDocs(collection(db, date));

  return querySnapshot;
}
export async function getDateNewsWithLimit(date) {
  const fireStoreQuery = await query(collection(db, date), limit(8));
  const dateNews = getDocs(fireStoreQuery);

  return dateNews;
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
  ß;
}
