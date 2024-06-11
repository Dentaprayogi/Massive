import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { testConnection, query } from "./database/db.js";
import router from "./Route/index.js";

const app = express();
dotenv.config();

app.use(cors());
// Alternatif express.json itu body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Tambahkan ini untuk mengaktifkan penguraian form-data
// Gunakan router
app.use("/api", router);

app.listen(process.env.APP_PORT, () => {
  testConnection();
  console.log(`Server is running at http://localhost:${process.env.APP_PORT}`);
});
