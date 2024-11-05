CREATE TYPE "public"."role" AS ENUM('admin', 'instructor', 'student');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"aucId" text NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"hashedPassword" char(64) NOT NULL,
	"role" "role" NOT NULL,
	"department" text,
	"classStanding" text,
	"major" text,
	"updatedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp,
	CONSTRAINT "users_aucId_unique" UNIQUE("aucId"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
