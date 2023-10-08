import express from 'express';
import mongoose from 'mongoose'
import router from './routes/route.js';

import process from 'process';
import dotenv  from 'dotenv';
import cors from 'cors';

dotenv.config();
const port = process.env.PORT || 5000;
const app = express();


  
app.use(express.urlencoded());
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((e) => console.error("Error connecting to database:", e));

  app.use(cors());
  app.use(express.json());

  app.use(router);
  app.listen(port, () => console.log("server hosted on port " + port));
