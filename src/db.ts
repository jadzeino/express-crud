require('dotenv').config();
import { MongoClient } from 'mongodb';

const {
  MONGO_HOST,
  MONGO_USERNAME,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_DB_NAME,
  MONGO_LOCAL,
} = process.env;

let MONGO_URI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}?authSource=admin`;

if (MONGO_LOCAL) {
  MONGO_URI = "mongodb://127.0.0.1:27017/express-crud?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.6.2"//`mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}`;
}

export const client = new MongoClient(MONGO_URI);
export const db = client.db();
