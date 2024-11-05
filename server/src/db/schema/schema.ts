import { boolean, char, integer, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// Define timestamps for all tables
const timestamps = {
    updatedAt: timestamp(),
    createdAt: timestamp().defaultNow().notNull(),
    deletedAt: timestamp(),
};

// Define the role enum
export const roleEnum = pgEnum("role", ["admin", "instructor", "student"]);

// Define the users table schema
export const usersTable = pgTable("users", {
    id: serial().primaryKey(),
    aucId: text().unique().notNull(),
    name: text().notNull(),
    email: text().unique().notNull(),
    hashedPassword: char({ length: 64 }).notNull(),
    role: roleEnum().notNull(),
    department: text(),
    classStanding: text(),
    major: text(),
    ...timestamps,
});

// Define the courses table schema
export const coursesTable = pgTable("courses", {
    courseId: serial().primaryKey(),
    openForEnrollment: boolean().notNull(),
    enrollmentKey: text().unique(),
    title: text().notNull(),
    numStudents: integer().default(0),
    instructorId: integer().references(() => usersTable.id),
    ...timestamps,
});
