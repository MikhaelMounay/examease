import { char, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

// Define the role enum
export const roleEnum = pgEnum("role", ["admin", "instructor", "student"]);

// Define the users table schema
export const usersTable = pgTable("users", {
    id: serial().primaryKey(),
    aucId: text().unique().notNull(),
    name: text().notNull(),
    email: text().unique().notNull(),
    hashedPassword: char({length: 64}).notNull(),
    role: roleEnum().notNull(),
    department: text(),
    classStanding: text(),
    major: text(),
    updatedAt: timestamp(),
    createdAt: timestamp().defaultNow().notNull(),
    deletedAt: timestamp(),
});
