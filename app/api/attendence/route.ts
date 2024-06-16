import { db } from "@/utils";
import { ATTENDENCE, STUDENTS } from "@/utils/schema";
import { and, asc, eq, isNull, or } from "drizzle-orm";
import { NextResponse } from "next/server";


export async function POST(req:Request,res:Response) {
    const data = await req.json();
    const result = await db.insert(ATTENDENCE).values({
        student_id:data?.student_id,
        present:data?.present,
        day:data?.day,
        date:isNull(data?.date) ? null : data?.date
    })
    return NextResponse.json(result);
}

