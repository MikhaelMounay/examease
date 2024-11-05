ALTER TABLE "users" RENAME COLUMN "hashedPassword" TO "password";--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "createdAt" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "updatedAt" timestamp;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "deletedAt" timestamp;--> statement-breakpoint
ALTER TABLE "public"."users" ALTER COLUMN "role" SET DATA TYPE text;--> statement-breakpoint
DROP TYPE "public"."role";--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('ADMIN', 'INSTRUCTOR', 'STUDENT');--> statement-breakpoint
ALTER TABLE "public"."users" ALTER COLUMN "role" SET DATA TYPE "public"."role" USING "role"::"public"."role";