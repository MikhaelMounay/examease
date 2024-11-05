CREATE TABLE IF NOT EXISTS "courses" (
	"courseId" serial PRIMARY KEY NOT NULL,
	"openForEnrollment" boolean NOT NULL,
	"enrollmentKey" text,
	"title" text NOT NULL,
	"numStudents" integer DEFAULT 0,
	"instructorId" integer,
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "courses_enrollmentKey_unique" UNIQUE("enrollmentKey")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "courses" ADD CONSTRAINT "courses_instructorId_users_id_fk" FOREIGN KEY ("instructorId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
