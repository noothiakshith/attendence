"use client"
import React, { useState, useEffect } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { getGrades, getAttendance } from '@/lib/actions/form.action'
import { toast } from 'sonner'


const GradeSelect = ({ selectedGrade }: { selectedGrade: any }) => {
    const [grades, setGrades] = useState<{ id: number; grade: string; }[]>([]);

    useEffect(() => {
        fetchGrades();
    }, []);

    const fetchGrades = async () => {
        const grades = await getGrades();
        console.log(grades);
        setGrades(grades);
    }

    return (
        <div>
        <select className='p-2 border rounded-lg'
        onChange={(e:any)=>selectedGrade(e.target.value)}
          >
            {grades.map((item, index) => (
                <option key={index} value={item.grade}>{item.grade}</option>
            ))}
        </select>
    </div>
    )
}

export default GradeSelect