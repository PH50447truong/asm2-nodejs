import express from "express";
import { products } from "./datamock/products";
import cors from "cors";

import router from "./routes";
const app = express();
app.use(cors());


app.use(express.json());

app.use("/", router)

app.get("/", (req, res) => {
  res.json(products);
});

export const viteNodeApp = app;
