import { configDotenv } from 'dotenv';

configDotenv();

const config = {
  firebaseKey: process.env.FIREBASEKEY,
  autoDomain: process.env.AUTODOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  firstApiKey: process.env.FIRSTKEY,
  secondApiKey: process.env.SECONDKEY,
  thirdApiKey: process.env.THIRDKEY,
  gptApiKey: process.env.GPTAPIKEY
};

export default config;
