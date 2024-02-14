import { configDotenv } from 'dotenv';

configDotenv();

const config = {
  firebaseKey: process.env.FIREBASEKEY,
  autoDomain: process.env.AUTODOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  apiKey: process.env.KEY,
  secondApiKey: process.env.SECONDKEY,
  thirdApiKey: process.env.THIRDKEY,
};

export default config;
