import { initializeApp } from 'firebase/app';
import { getFirestore, getDoc, getDocs, setDoc, collection, doc } from 'firebase/firestore';
// eslint-disable-next-line import/no-extraneous-dependencies
import { OpenAI } from 'openai';
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

export async function getNewsDetail(title, data) {
  const [todayCollection, yesterdayCollection] = getToday();
  try {
    const searchTitle = decodeURIComponent(title);
    /* category 검색 추가 */
    if (data) {
      const docRef = doc(db, data, searchTitle);
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

export async function generateText(promptText) {
  const openaiClient = new OpenAI({
    apiKey: config.gptApiKey,
    dangerouslyAllowBrowser: true,
  });

  console.dir(openaiClient);

  try {
    const response = await openaiClient.fetch({
      model: 'text-davinci-003',
      prompt: promptText,
      max_tokens: 50,
      temperature: 0.7,
    });
    console.log(response.data.choices[0].text);
  } catch (error) {
    console.error(error);
  }
}

generateText('Once upon a time');
