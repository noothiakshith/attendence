CREATE TABLE IF NOT EXISTS "attendence" (
	"id" serial PRIMARY KEY NOT NULL,
	"student_id" varchar(50) NOT NULL,
	"present" boolean DEFAULT false,
	"day" serial NOT NULL,
	"date" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "grades" (
	"id" serial PRIMARY KEY NOT NULL,
	"grade" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "students" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"grade" varchar(50) NOT NULL,
	"address" varchar(255) NOT NULL,
	"contact" varchar(100) NOT NULL
);
