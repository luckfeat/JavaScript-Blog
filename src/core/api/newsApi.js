import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, setDoc, collection, doc, deleteDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
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
const functions = getFunctions();
const postArticles = httpsCallable(functions, 'postArticles');
const deleteCollection = httpsCallable(functions, 'deleteCollection');

export async function getArticles() {
  const date = new Date();
  const today = `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
  const querySnapshot = await getDocs(collection(db, today));

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
    await deleteCollection();
    await postArticles();
  }
}
