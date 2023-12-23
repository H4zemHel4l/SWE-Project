import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { UserRouter } from "./routes/userRoute.js";
import { BookRouter } from "./routes/BookRoute.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MongodbURL, {
    dbName: "booktopia",
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("DB Connection Failed");
    console.log(err);
  });
app.use("/books", BookRouter);
app.use(UserRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server started at ${port}...`);
});
