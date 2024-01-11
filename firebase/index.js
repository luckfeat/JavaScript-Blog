import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

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

fetch('http://api.mediastack.com/v1/news? access_key = e53d802a6a974c11983cd84b6e42d851');
