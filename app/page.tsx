"use client"
import Image from "next/image";
import Router from "next/navigation";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const onClick = ()=>{
    router.push('/dashboard');
  }
  return (
    <>
    <Button onClick={onClick}>Dashboard</Button>
    <h1 className="text-3xl font-bold items-center">attendence vey ra babu</h1>
    </>
  );
}
