import express, { json, urlencoded } from "express";

import router from "./routes/index.js";

const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());

app.use("/api", router);

export default app;
