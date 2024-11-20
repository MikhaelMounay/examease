import { Router } from "express";
import {
    createExam,
    deleteExam,
    getExamById,
    getExams,
    getExamsByCourseId,
    updateExam,
} from "../handlers/exams.js"; // Update path according to your project structure
import { authenticate } from "../middleware/auth.js";

const examsRouter = Router();

// TODO: Add authentication middleware
// examsRouter.use(authenticate);

examsRouter.get("/", getExams); // Fetch all exams
examsRouter.get("/:id", getExamById); // Fetch a single exam by ID
examsRouter.get("/course/:courseId", getExamsByCourseId); // Fetch exams by course ID
examsRouter.post("/", authenticate, createExam); // Create a new exam
examsRouter.put("/:id", authenticate, updateExam); // Update an exam by ID
examsRouter.delete("/:id", authenticate, deleteExam); // Delete an exam by ID

export default examsRouter;
