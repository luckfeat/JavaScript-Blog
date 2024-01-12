import { configDotenv } from 'dotenv';

configDotenv();

const config = {
  apiToken: process.env.API_TOKEN,
};

export default config;
