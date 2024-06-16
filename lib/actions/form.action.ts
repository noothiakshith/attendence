
"use server"

import { db } from "@/utils";
import { ATTENDENCE, GRADES, STUDENTS } from './../../utils/schema';
import { and, asc, eq ,sql} from "drizzle-orm";
import Attendance from "@/app/dashboard/attendence/page";
import { AnyAaaaRecord } from "dns";


interface AddStudentResponse {
  success: boolean;
  error?: string;
}

export async function addNewStudent(data: any): Promise<AddStudentResponse> {
  try {
    await db.insert(STUDENTS).values(data);
    return { success: true };
  } catch (err) {
    console.error("Error adding new student:", err);
    return { success: false, error: "Error adding new student" };
  }
}

export async function makepresent(data:any){
  try{
    const reuslt = await db.insert(ATTENDENCE).values({
      student_id:data.studentId,
      present:data.present,
      day:data.day,
      date:data.date
    })
  }
  catch(err){
    console.log("error")
  }
}


export async function getAttendance(grade: string, month: any) {
  try {
    const result = await db.select({
      name: STUDENTS.name,
      present: ATTENDENCE.present,
      studentId: STUDENTS.id,
      day: ATTENDENCE.day,
      date: ATTENDENCE.date,
      grade: STUDENTS.grade,
      attendanceId: ATTENDENCE.id
    })
    .from(STUDENTS)
    .leftJoin(ATTENDENCE, and(eq(STUDENTS.id, sql`cast(${ATTENDENCE.student_id} as integer)`), eq(ATTENDENCE.date, month))) // Cast student_id to integer and join by month
    .where(eq(STUDENTS.grade, grade))
    .orderBy(asc(STUDENTS.id))
    .execute(); 
    console.log("Joined Data:", result);
    
    return result;
  } catch (err) {
    console.error("Error fetching attendance:", err);
    return [];
  }
}
export async function getStudents() {
  try {
    const students = await db.select().from(STUDENTS);
    return students;
  } catch (err) {
    console.error("Error fetching students:", err);
    return [];
  }
}

export async function getGrades(){
  try{
    const grades = await db.select().from(GRADES);
    return grades;
  }
  catch(err){
    console.error("Error fetching grades:", err);
    return [];
  }
}

export async function deleteStudent(data: any): Promise<any> {
  try {
    const result = await db.delete(STUDENTS).where(eq(STUDENTS.id, data.id));
    return result;
  } catch (err) {
    console.log();
  }
}

