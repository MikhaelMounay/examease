import { Router } from "express";

// import { authenticate } from "../middleware/auth.js";
import { createCourse, deleteCourse, getCourseById, getCourses, updateCourse } from "../handlers/courses.js";
import { authenticate } from "../middleware/auth.js";

const coursesRouter = Router();

// TODO: Add authentication middleware
// coursesRouter.use(authenticate);

coursesRouter.get("/", getCourses);
coursesRouter.get("/:id", getCourseById);
coursesRouter.post("/", authenticate, createCourse);
coursesRouter.put("/:id", updateCourse);
coursesRouter.delete("/:id", deleteCourse);

export default coursesRouter;
