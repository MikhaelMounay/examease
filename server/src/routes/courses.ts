import { Router } from "express";

// import { authenticate } from "../middleware/auth.js";
import {
    createCourse,
    deleteCourse,
    getCourseById,
    getCourses,
    joinCourse,
    updateCourse,
    dropCourse,
    getCoursesByInstructorId,
} from "../handlers/courses.js";
import { authenticate } from "../middleware/auth.js";

const coursesRouter = Router();

// TODO: Add authentication middleware
// coursesRouter.use(authenticate);

coursesRouter.get("/", authenticate, getCourses);
coursesRouter.get("/:id", authenticate, getCourseById);
coursesRouter.post("/", authenticate, createCourse);
coursesRouter.put("/:id",  authenticate, updateCourse);
coursesRouter.delete("/:id",  authenticate, deleteCourse);
coursesRouter.get("/instructor/:Instructor_Id", getCoursesByInstructorId);

coursesRouter.post("/join", authenticate, joinCourse);
coursesRouter.post("/drop", authenticate, dropCourse);

export default coursesRouter;
