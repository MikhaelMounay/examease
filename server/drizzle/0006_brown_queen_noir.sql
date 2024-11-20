CREATE TABLE IF NOT EXISTS "users_courses" (
	"user_id" integer NOT NULL,
	"course_id" integer NOT NULL,
	CONSTRAINT "users_courses_user_id_course_id_pk" PRIMARY KEY("user_id","course_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_courses" ADD CONSTRAINT "users_courses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_courses" ADD CONSTRAINT "users_courses_course_id_courses_id_fk" FOREIGN KEY ("course_id") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
