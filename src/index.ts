import dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import cors from "cors";

import router from "./routes";
import connecDB from "./config/database";

connecDB(); // connecting db

const app = express();
const port = 4000;

// basic middleware configuraion
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router); // binding all routes

app.listen(port, () => {
  console.log(`server running on ${port}`);
});
