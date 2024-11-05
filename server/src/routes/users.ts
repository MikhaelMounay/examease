import { Router } from "express";

import { createUser, getUser, loginUser } from "../handlers/users.js";
import { authenticate } from "../middleware/auth.js";

const usersRouter = Router();

usersRouter.post("/register", createUser);
usersRouter.post("/login", loginUser);
usersRouter.get("/user", authenticate, getUser);

export default usersRouter;
