import { relations } from "drizzle-orm";
import { boolean, integer, pgEnum, pgTable, serial, text, timestamp, primaryKey } from "drizzle-orm/pg-core";

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

// define usersTable relations
export const usersRelations = relations(usersTable, ({ many }) => ({
    usersCoursesTable: many(usersCoursesTable),
}));

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

// define coursesTable relations
export const coursesRelations = relations(coursesTable, ({ many }) => ({
    usersCoursesTable: many(usersCoursesTable),
}));

// #endregion

// #region userCoursesTable

// Define the `courses` table schema and infer Typescript types
export const usersCoursesTable = pgTable(
    "users_courses",
    {
        userId: integer("user_id")
            .notNull()
            .references(() => usersTable.id),
        courseId: integer("course_id")
            .notNull()
            .references(() => coursesTable.id),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.userId, t.courseId] }),
    })
);

// Define userCourseTable relations
export const usersToGroupsRelations = relations(usersCoursesTable, ({ one }) => ({
    user: one(usersTable, {
        fields: [usersCoursesTable.userId],
        references: [usersTable.id],
    }),
    course: one(coursesTable, {
        fields: [usersCoursesTable.userId],
        references: [coursesTable.id],
    }),
}));
// #endregion

// #region exam schema

// Define the `exams` table schema and infer Typescript types
export const examsTable = pgTable("exams", {
    id: serial().primaryKey().notNull(),
    courseId: integer().references(() => coursesTable.id),
    title: text().notNull(),
    maxGrade: integer().default(0),
    startTime: timestamp(),
    endTime: timestamp(),
    ...timestamps,
});
export type Exam = typeof examsTable.$inferSelect;
export type NewExam = typeof examsTable.$inferInsert;

// Define the progLang enum
export const progLangEnum = pgEnum("progLang", ["CPP", "PYTHON", "JAVA", "JS"]);

// Define the `Questions` table schema and infer Typescript types
export const questionsTable = pgTable("questions", {
    id: serial().primaryKey().notNull(),
    examId: integer().references(() => examsTable.id),
    prompt: text().notNull(),
    maxGrade: integer().notNull(),
    numChoices: integer().default(0),
    progLang: progLangEnum(),
    ...timestamps,
});
export type Question = typeof questionsTable.$inferSelect;
export type NewQuestion = typeof questionsTable.$inferInsert;

export const choicesTable = pgTable("choices", {
    id: serial().primaryKey().notNull(),
    questionId: integer().references(() => questionsTable.id),
    choiceBody: text().notNull(),
    isTrueAnswer: boolean().default(false),
    ...timestamps,
});

export type Choice = typeof choicesTable.$inferSelect;
export type NewChoice = typeof choicesTable.$inferInsert;
