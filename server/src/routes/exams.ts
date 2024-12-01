import { Router } from "express";
import { createExam, deleteExam, getExamById, getExams, getExamsByCourseId, updateExam } from "../handlers/exams.js"; // Ensure the path matches your project structure
import { authenticate } from "../middleware/auth.js";

const examsRouter = Router();

// Authentication middleware for protected routes
examsRouter.use(authenticate); // Apply to all routes if authentication is required

// Routes
examsRouter.get("/", getExams); // Fetch all exams
examsRouter.get("/:id", getExamById); // Fetch a single exam by ID
examsRouter.get("/course/:courseId", getExamsByCourseId); // Fetch exams by course ID
examsRouter.post("/", createExam); // Create a new exam (protected)
examsRouter.put("/:id", updateExam); // Update an exam by ID (protected)
examsRouter.delete("/:id", deleteExam); // Delete an exam by ID (protected)

export default examsRouter;
