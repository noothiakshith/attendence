import { STUDENTS } from './../../../utils/schema';
import { db } from "@/utils";
import { eq } from "drizzle-orm";
import { url } from 'inspector';
import next from 'next';
import { NextResponse } from "next/server";

export async function Get(req:Request) {
  const result = await db.select().from(STUDENTS);
  return NextResponse.json(result);
}

export async function Post(req:Request,res:Response) {
  const data = await req.json();
  const result = await db.insert(STUDENTS).values({
    name:data?.name,
    grade:data?.grade,
    address:data?.address,
    contact:data?.contact
  })
  return NextResponse.json(result);
}

export async function DELETE(req:Request,res:Response){
  const searchParams = new URLSearchParams(url);
  const id = searchParams.get('id');
  const result = await db.delete(STUDENTS).where(eq(STUDENTS.id,id))
  return NextResponse.json(result);
}