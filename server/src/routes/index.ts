import { Router } from "express";

import usersRouter from "./users.js";
import coursesRouter from "./courses.js";
import examsRouter from "./exams.js";

const router = Router();

router.use("/users", usersRouter);
router.use("/courses", coursesRouter);
router.use("/exams", examsRouter);

export default router;
