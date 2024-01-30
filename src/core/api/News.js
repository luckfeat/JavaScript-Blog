import { initializeApp } from 'firebase/app';
import { getFirestore, getDocs, collection } from 'firebase/firestore';
// import { getFunctions, httpsCallable } from 'firebase/functions';
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
// const functions = getFunctions();
// const sayHello = httpsCallable(functions, 'sayHello');

async function getQuerySnapshot(db) {
  const querySnapshot = await getDocs(collection(db, 'Update'));

  return querySnapshot;
}

getQuerySnapshot(db).then(docs => {
  /**
   * firestore news articles updated time 을 기준으로 만약 기사 업데이트 시간이 하루가 초과된 경우
   * 기존의 articles 를 삭제하고
   * onCall 함수를 실행해 기사를 추가한다.
   */
  if (docs.empty) {
    const updatedTime = new Date();

    setTimeout(() => {
      const currentTime = new Date();
      const timeDifference = (currentTime - updatedTime) / (1000 * 60 * 60 * 24);

      if (timeDifference >= 1) {
        console.log('하루가 지났어요');
      }
    }, 3000);
  } else {
    docs.forEach(doc => {
      console.log(doc.data());
    });
  }
});

/**
 * Stack articles with random categories [general, world, nation, business, technology, entertainment, sports, science, health.]
 * 90 Articles
 * n-minutes read
 * 뉴스 기사 저장 및 시간 계산 코드는 서버에
 * 산출된 결과를 요청하는 코드는 클라이언트에
 * 기존의 fetchArticles 코드를 getDocs 로 대체
 */

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
