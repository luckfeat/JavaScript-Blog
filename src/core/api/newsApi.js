import { initializeApp } from 'firebase/app';
import { getFirestore, getDoc, getDocs, setDoc, collection, doc } from 'firebase/firestore';
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

function getToday() {
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

export async function getNewsDetail(title, category) {
  const [todayCollection, yesterdayCollection] = getToday();
  try {
    const searchTitle = decodeURIComponent(title);
    /* category 검색 추가 */
    if (category) {
      const docRef = doc(db, category, searchTitle);
      const querySnapshot = await getDoc(docRef);

      return querySnapshot.data();
    }
    const docRef = doc(db, todayCollection, searchTitle) || doc(db, yesterdayCollection, searchTitle);
    const querySnapshot = await getDoc(docRef);

    return querySnapshot.data();
  } catch (err) {
    console.error(err.message);
  }
}

export async function getKeywordNews(category) {
  const querySnapshot = await getDocs(collection(db, category));

  return querySnapshot;
}

export async function getDateNews(date) {
  const querySnapshot = await getDocs(collection(db, date));

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
