ALTER TABLE "courses" RENAME COLUMN "courseId" TO "course_id";--> statement-breakpoint
ALTER TABLE "courses" RENAME COLUMN "openForEnrollment" TO "open_for_enrollment";--> statement-breakpoint
ALTER TABLE "courses" RENAME COLUMN "enrollmentKey" TO "enrollment_key";--> statement-breakpoint
ALTER TABLE "courses" RENAME COLUMN "numStudents" TO "num_students";--> statement-breakpoint
ALTER TABLE "courses" RENAME COLUMN "instructorId" TO "instructor_id";--> statement-breakpoint
ALTER TABLE "courses" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "courses" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "courses" RENAME COLUMN "deletedAt" TO "deleted_at";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "aucId" TO "auc_id";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "classStanding" TO "class_standing";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "deletedAt" TO "deleted_at";--> statement-breakpoint
ALTER TABLE "courses" DROP CONSTRAINT "courses_enrollmentKey_unique";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_aucId_unique";--> statement-breakpoint
ALTER TABLE "courses" DROP CONSTRAINT "courses_instructorId_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "courses" ADD CONSTRAINT "courses_instructor_id_users_id_fk" FOREIGN KEY ("instructor_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_enrollmentKey_unique" UNIQUE("enrollment_key");--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_aucId_unique" UNIQUE("auc_id");