
import { PgTable, boolean, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export const GRADES = pgTable('grades', {
  id: serial('id').primaryKey(),  
  grade: varchar('grade', { length: 50 }).notNull(),
});
export const STUDENTS = pgTable('students', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  grade: varchar('grade', { length: 50 }).notNull(),
  address: varchar('address', { length: 255 }).notNull(),
  contact: varchar('contact', { length: 100 }).notNull(),
});

export const ATTENDENCE = pgTable('attendence', {
  id: serial('id').primaryKey(),
  student_id: varchar('student_id', { length: 50 }).notNull(), 
  present: boolean('present').default(false),
  day: serial('day').notNull(),
  date: varchar('date', { length: 100 }).notNull(),
});