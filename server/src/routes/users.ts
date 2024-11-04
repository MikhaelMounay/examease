import { Router } from "express";

import getUser from "../handlers/users.js";

const usersRouter = Router();

usersRouter.get("/", getUser);

export default usersRouter;
