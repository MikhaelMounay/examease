import { boolean, integer, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// Define timestamps for all tables
const timestamps = {
    updatedAt: timestamp(),
    createdAt: timestamp().defaultNow().notNull(),
    deletedAt: timestamp(),
};

// #region User schema

// Define the role enum
export const roleEnum = pgEnum("role", ["ADMIN", "INSTRUCTOR", "STUDENT"]);

// Define the `users` table schema and infer Typescript types
export const usersTable = pgTable("users", {
    id: serial().primaryKey().notNull(),
    aucId: text().unique().notNull(),
    name: text().notNull(),
    email: text().unique().notNull(),
    password: text().notNull(),
    role: roleEnum().notNull(),
    department: text(),
    classStanding: text(),
    major: text(),
    ...timestamps,
});

export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;
export type UserWithoutPassword = Omit<User, "password">;
export type UserWithToken = UserWithoutPassword & { token: string };

// #endregion

// #region Course schema

// Define the `courses` table schema and infer Typescript types
export const coursesTable = pgTable("courses", {
    id: serial().primaryKey().notNull(),
    openForEnrollment: boolean().notNull(),
    enrollmentKey: text().unique(),
    title: text().notNull(),
    numStudents: integer().default(0),
    instructorId: integer().references(() => usersTable.id),
    ...timestamps,
});

export type Course = typeof coursesTable.$inferSelect;
export type NewCourse = typeof coursesTable.$inferInsert;

// #endregion

// #region exam schema

// Define the `exams` table schema and infer Typescript types
export const examsTable = pgTable("exams", {
    id: serial().primaryKey().notNull(),
    courseId: integer().references(() => coursesTable.id),
    title: text().notNull(),
    maxGrade: integer().notNull(),
    duration: integer().notNull(),
    ...timestamps,
});
export type Exam = typeof examsTable.$inferSelect;
export type NewExam = typeof examsTable.$inferInsert;
