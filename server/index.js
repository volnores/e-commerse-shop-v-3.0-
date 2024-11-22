import express from 'express';
import mongoose from 'mongoose';
import router from './routes/index.js';
import doteenv from 'dotenv';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';

doteenv.config();

const PORT = process.env.PORT || 7000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cors());
app.use(express.json());
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(fileUpload({}));
app.use('/api', router);

const start = async () => {
  try {
    await mongoose
      .connect(process.env.BD_URL)
      .then(() => console.log('DB работает'))
      .catch((err) => console.log('DB error', err));
    app.listen(PORT, () => console.log(`Сервер запущен на ${PORT} порте`));
  } catch (error) {
    console.log(error);
  }
};

start();
