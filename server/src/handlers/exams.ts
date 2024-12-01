import { Request, Response } from "express";
import { eq } from "drizzle-orm";

import { db } from "../db/index.js";
import { examsTable, questionsTable } from "../db/schema/schema.js";
//import { date } from "drizzle-orm/mysql-core";

// Fetch all exams
export const getExams = async (_req: Request, res: Response) => {
    try {
        const exams = await db.select().from(examsTable);
        res.status(200).json(exams);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve exams", error });
    }
};

// Fetch a single exam by ID
export const getExamById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const [exam] = await db
            .select()
            .from(examsTable)
            .where(eq(examsTable.id, Number(id)))
            .limit(1);

        if (!exam) {
            res.status(404).json({ message: "Exam not found" });
            return;
        }

        res.status(200).json(exam);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve exam", error });
    }
};

// Fetch all exams for a specific course
export const getExamsByCourseId = async (req: Request, res: Response) => {
    const { courseId } = req.params;
    try {
        const exams = await db
            .select()
            .from(examsTable)
            .where(eq(examsTable.courseId, Number(courseId)));

        if (exams.length === 0) {
            res.status(404).json({ message: "No exams found for this course" });
            return;
        }

        res.status(200).json(exams);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve exams", error });
    }
};

// Create a new exam
export const createExam = async (req: Request, res: Response) => {
    const { courseId, title, startTime, endTime, questions } = req.body;

    let maxGrade = 0;
    for (let i = 0; i < questions.length; i++) {
        maxGrade += questions[i].maxGrade;
    }

    console.log(questions);

    try {
        const [newExam] = await db
            .insert(examsTable)
            .values({
                courseId,
                title,
                startTime: new Date(startTime),
                endTime: new Date(endTime),
                maxGrade: maxGrade || 0,
            })
            .returning();

        const progLangs = {
            "C++": "CPP",
            Java: "JAVA",
            Python: "PYTHON",
            JavaScript: "JS",
        };

        for (const question of questions) {
            // @ts-ignore
            await db.insert(questionsTable).values({
                examId: newExam.id,
                prompt: question.prompt,
                // @ts-ignore
                progLang: progLangs[question.language || ""],
                maxGrade: question.maxGrade,
            });
        }

        res.status(200).json(newExam);
    } catch (error) {
        console.log("Error creating exam:", error);
        res.status(500).json({ message: "Failed to create exam", error });
    }
};

// Update an exam by ID
export const updateExam = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { courseId, title, maxGrade, startTime, endTime } = req.body;

    try {
        const [updatedExam] = await db
            .update(examsTable)
            .set({
                courseId,
                title,
                maxGrade,
                startTime,
                endTime,
            })
            .where(eq(examsTable.id, Number(id)))
            .returning();

        if (!updatedExam) {
            res.status(404).json({ message: "Exam not found" });
            return;
        }

        res.status(200).json(updatedExam);
    } catch (error) {
        res.status(500).json({ message: "Failed to update exam", error });
    }
};

// Delete an exam by ID
export const deleteExam = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const [deletedExam] = await db
            .delete(examsTable)
            .where(eq(examsTable.id, Number(id)))
            .returning();

        if (!deletedExam) {
            res.status(404).json({ message: "Exam not found" });
            return;
        }

        res.status(200).json({ message: "Exam deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete exam", error });
    }
};
