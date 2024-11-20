import { Request, Response } from "express";
import { eq, and } from "drizzle-orm";

import { db } from "../db/index.js";
import { coursesTable, usersCoursesTable } from "../db/schema/schema.js";

// Fetch all courses
export const getCourses = async (_req: Request, res: Response) => {
    try {
        const courses = await db.select().from(coursesTable);
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve courses", error });
    }
};

// Fetch a single course by ID
export const getCourseById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const [course] = await db
            .select()
            .from(coursesTable)
            .where(eq(coursesTable.id, Number(id)))
            .limit(1);
        if (!course) {
            res.status(404).json({ message: "Course not found" });
            return;
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve course", error });
    }
};

// Create a new course
export const createCourse = async (req: Request, res: Response) => {
    const { title, openForEnrollment, numStudents } = req.body;

    // @ts-ignore
    const instructorId = Number(req.user.id);

    // Generate a random enrollment key
    let enrollmentKey = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 8; i++) {
        enrollmentKey += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    try {
        const [newCourse] = await db
            .insert(coursesTable)
            .values({
                title,
                openForEnrollment,
                enrollmentKey,
                numStudents,
                instructorId,
            })
            .returning();

        res.status(200).json(newCourse);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Failed to create course", error });
    }
};

// Update a course by ID
export const updateCourse = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, openForEnrollment, enrollmentKey, numStudents, instructorId } = req.body;

    try {
        const [updatedCourse] = await db
            .update(coursesTable)
            .set({
                title,
                openForEnrollment,
                enrollmentKey,
                numStudents,
                instructorId,
            })
            .where(eq(coursesTable.id, Number(id)))
            .returning();

        if (!updatedCourse) {
            res.status(404).json({ message: "Course not found" });
            return;
        }
        res.status(200).json(updatedCourse);
    } catch (error) {
        res.status(500).json({ message: "Failed to update course", error });
    }
};

// Delete a course by ID
export const deleteCourse = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const [deleted] = await db
            .delete(coursesTable)
            .where(eq(coursesTable.id, Number(id)))
            .returning();
        if (!deleted) {
            res.status(404).json({ message: "Course not found" });
            return;
        }
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete course", error });
    }
};

//self-enrollment: join course
export const joinCourse = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const studentId = Number(req.user.id);
        const { courseId, enrollmentKey } = req.body;

        // Check if the course exists and is open for enrollment
        const [course] = await db.select().from(coursesTable).where(eq(coursesTable.id, courseId)).limit(1);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        if (!course.openForEnrollment || course.enrollmentKey !== enrollmentKey) {
            return res.status(400).json({ message: "Invalid enrollment key or course is not open for enrollment" });
        }

        // Check if the user is already enrolled
        const existingEnrollment = await db
            .select()
            .from(usersCoursesTable)
            .where(and(eq(usersCoursesTable.userId, studentId), eq(usersCoursesTable.courseId, courseId)))
            .limit(1);

        if (existingEnrollment) {
            return res.status(400).json({ message: "You are already enrolled in this course" });
        }
        await db
            .insert(usersCoursesTable)
            .values({
                courseId,
                userId: studentId,
            })
            .returning();

        // Increment the student count for the course
        await db
            .update(coursesTable)
            .set({ numStudents: (course.numStudents ?? 0) + 1 })
            .where(eq(coursesTable.id, courseId));

        res.status(200).json({ message: "Successfully enrolled in the course" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//self-enrollment: Drop Course
export const dropCourse = async (req: Request, res: Response) => {
    try {
        const { studentId, courseId } = req.body;

        // Check if the user is already enrolled
        const existingEnrollment = await db
            .select()
            .from(usersCoursesTable)
            .where(and(eq(usersCoursesTable.userId, studentId), eq(usersCoursesTable.courseId, courseId)))
            .limit(1);
        if (!existingEnrollment) {
            return res.status(400).json({ message: "You are not enrolled in this course" });
        }

        //remove the student from the course
        await db
            .delete(usersCoursesTable)
            .where(and(eq(usersCoursesTable.userId, studentId), eq(usersCoursesTable.courseId, courseId)));

        // Decrement the student count for the course
        const [course] = await db.select().from(coursesTable).where(eq(coursesTable.id, courseId)).limit(1);
        await db
            .update(coursesTable)
            .set({ numStudents: (course.numStudents ?? 0) - 1 })
            .where(eq(coursesTable.id, courseId));

        res.status(200).json({ message: "Successfully dropped the course" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
