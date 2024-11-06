import { Router } from "express";

import usersRouter from "./users.js";
import coursesRouter from "./courses.js";

const router = Router();

router.use("/users", usersRouter);
router.use("/courses", coursesRouter);

export default router;
