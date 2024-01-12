import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import config from '../config.mjs';

const firebaseConfig = {
  apiKey: 'AIzaSyBF0GSEDU9w1ELPgTRCx9b_ZNnT6rM8OlE',
  authDomain: 'blog-f573d.firebaseapp.com',
  projectId: 'blog-f573d',
  storageBucket: 'blog-f573d.appspot.com',
  messagingSenderId: '776229742422',
  appId: '1:776229742422:web:4446f16c8c3d728933d8f7',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function fetchBlogData() {
  try {
    const querySnapshot = await getDocs(collection(db, 'blog'));
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
    });
  } catch (error) {
    console.error('Error fetching documents: ', error);
  }
}

fetchBlogData();

const baseUrl = 'https://api.stockdata.org/v1/news/all';
const language = 'en';
const industries = ['Technology', 'Energy'];
const page = 1;
const apiToken = config.apiToken;

const url = `${baseUrl}?language=${language}&industries=${industries.join(
  ','
)}&page=${page}&api_token=${apiToken}`;

fetch(url)
  .then((data) => {
    return data.json();
  })
  .then((res) => {
    console.log(res);
  });
