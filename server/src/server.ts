import express, { json, urlencoded } from "express";

import router from "./routes/index.js";
import { db } from "./db/index.js";

const app = express();

async function main() {
    db.$client.connect();

    app.use(urlencoded({ extended: true }));
    app.use(json());
    
    app.use("/api", router);
}

main();

export default app;
