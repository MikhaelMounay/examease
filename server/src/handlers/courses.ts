import { Request, Response } from "express";
import { eq, and } from "drizzle-orm";

import { db } from "../db/index.js";
import { usersTable, coursesTable, usersCoursesTable } from "../db/schema/schema.js";

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
export const getCoursesByUserId = async (req: Request, res: Response) => {
    const { userId } = req.params;

    try {
        const courses = await db
            .select()
            .from(usersCoursesTable)
            .innerJoin(coursesTable, eq(coursesTable.id, usersCoursesTable.courseId))
            .where(eq(usersCoursesTable.userId, Number(userId)));

        res.status(200).json(courses.map((courseData) => courseData.courses));
    } catch (error) {
        res.status(500).json({ message: "Failed to retrieve courses", error });
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

        await db
            .insert(usersCoursesTable)
            .values({
                courseId: newCourse.id,
                userId: instructorId,
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
        const { enrollmentKey } = req.body;

        // Check if the course exists and is open for enrollment
        const [course] = await db.select().from(coursesTable).where(eq(coursesTable.enrollmentKey, enrollmentKey)).limit(1);
        if ((course.numStudents ?? 0) <= 0) {
            res.status(400).json({ message: "Course capacity reached." });
            return;
        }
        if (!course) {
            res.status(404).json({ message: "Course not found" });
            return;
        }
        if (!course.openForEnrollment || course.enrollmentKey !== enrollmentKey) {
            res.status(400).json({ message: "Invalid enrollment key or course is not open for enrollment" });
            return;
        }

        // Check if the user is already enrolled
        const existingEnrollment = await db
            .select()
            .from(usersCoursesTable)
            .where(and(eq(usersCoursesTable.userId, studentId), eq(usersCoursesTable.courseId, course.id)))
            .limit(1);

        if (existingEnrollment.length) {
            res.status(400).json({ message: "You are already enrolled in this course" });
            return;
        }
        await db
            .insert(usersCoursesTable)
            .values({
                courseId: course.id,
                userId: studentId,
            })
            .returning();

        // decrement the student count for the course
        await db
            .update(coursesTable)
            .set({ numStudents: (course.numStudents ?? 0) - 1 })
            .where(eq(coursesTable.id, course.id));

        res.status(200).json({ message: "Successfully enrolled in the course" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//instructor-controlled enrollment: add student to course
export const addStudenttoCourse = async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        // const instructorId = Number(req.user.id);
        const { courseId, studentAucId } = req.body;

        // Validate input
        if (!courseId || !studentAucId) {
            res.status(400).json({ message: "Course ID and Student ID are required." });
            return;
        }
        // Check if the course has reached its capacity

        // Check if the course exists and is managed by the instructor
        const [course] = await db.select().from(coursesTable).where(eq(coursesTable.id, courseId)).limit(1);

        if ((course.numStudents ?? 0) <= 0) {
            res.status(400).json({ message: "Course capacity reached." });
            return;
        }

        if (!course) {
            res.status(404).json({ message: "Course not found." });
            return;
        }

        // if (course.instructorId !== instructorId) {
        //     res.status(403).json({ message: "You are not authorized to manage this course." });
        //     return;
        // }

        // Check if the student exists
        const [studentUser] = await db.select().from(usersTable).where(eq(usersTable.aucId, studentAucId)).limit(1);

        if (!studentUser) {
            res.status(404).json({ message: "Student not found." });
            return;
        }

        // Add student to the course
        await db.insert(usersCoursesTable).values({
            courseId,
            userId: studentUser.id,
        });

        // Update the number of students in the course
        const updatedNumStudents = (course.numStudents ?? 0) + 1;
        await db.update(coursesTable).set({ numStudents: updatedNumStudents }).where(eq(coursesTable.id, courseId));

        // Respond with success
        res.status(200).json({ message: "Student successfully added to the course." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
};

//instructor-controlled enrollment: remove student from course
export const removeStudentfromCourse = async (req: Request, res: Response) => {
    try {
        //@ts-ignore
        const instructorId = Number(req.user.id);
        const { studentId, courseId } = req.body;

        // Check if the course exists and is managed by the instructor
        const [course] = await db.select().from(coursesTable).where(eq(coursesTable.id, courseId)).limit(1);
        if (!course) {
            res.status(404).json({ error: "Course not found" });
            return;
        }
        // if (course.instructorId !== instructorId) {
        //     res.status(403).json({ error: "You are not authorized to manage this course" });
        //     return;
        // }

        // Check if the user is already enrolled
        const existingEnrollment = await db
            .select()
            .from(usersCoursesTable)
            .where(and(eq(usersCoursesTable.userId, studentId), eq(usersCoursesTable.courseId, courseId)))
            .limit(1);
        if (!existingEnrollment) {
            res.status(400).json({ message: "You are not enrolled in this course" });
            return;
        }

        //remove the student from the course
        await db
            .delete(usersCoursesTable)
            .where(and(eq(usersCoursesTable.userId, studentId), eq(usersCoursesTable.courseId, courseId)));

        // Decrement the student count for the course
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

export const getCourseStudents = async (req: Request, res: Response) => {
    let courseId;
    try {
        courseId = parseInt(req.params.courseId);
    } catch (err) {
        console.log("Error: ", err);
        res.status(400).json({ message: "Course Id invalid" });
        return;
    }

    try {
        const students = await db
            .select()
            .from(usersCoursesTable)
            .where(and(eq(usersCoursesTable.courseId, courseId), eq(usersTable.role, "STUDENT")))
            .innerJoin(usersTable, eq(usersCoursesTable.userId, usersTable.id));

        res.status(200).json(
            students.map((student) => ({
                studentId: student.users.id,
                studentAucId: student.users.aucId,
                studentName: student.users.name,
                classStanding: student.users.classStanding,
            }))
        );
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).json({ message: "Internal server error" });
    }
};
