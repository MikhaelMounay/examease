import { Request, Response } from "express";
import { eq } from "drizzle-orm";

import { db } from "../db/index.js";
import { coursesTable } from "../db/schema/schema.js";

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



// All courses for a specific person
export const getCoursesByInstructorId = async (req: Request, res: Response) => {
    const { Instructor_Id } = req.params;
    try {
        const courses = await db
            .select()
            .from(coursesTable)
            .where(eq(coursesTable.instructorId, Number(Instructor_Id)));

        if (courses.length === 0) {
            res.status(404).json({ message: "No courses found for this instructor" });
            return;
        }

        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve courses", error });
    }
};

// Create a new course
export const createCourse = async (req: Request, res: Response) => {
    const { title, openForEnrollment, numStudents, instructorId } = req.body;

    // @ts-ignore
    console.log(req.user);

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
