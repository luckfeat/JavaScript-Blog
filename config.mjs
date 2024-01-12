import { configDotenv } from 'dotenv';

configDotenv();

const config = {
  firebaseKey: process.env.FIREBASE,
  apiKey: process.env.KEY,
};

export default config;
