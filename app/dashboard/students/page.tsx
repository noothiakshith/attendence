"use client"
import React, { useState, useEffect } from 'react';
import AddNewStudent from './_components/AddNewStudent';
import { deleteStudent as deleteStudentAction, getStudents, getgrades } from '@/lib/actions/form.action';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import StudentListTable from './_components/StudentListTable';

const Students = () => {
  const [students,setStudents] = useState([]);
  useEffect(()=>{
    displayStudents();
  },[])
  const displayStudents = async  ()=>{
    const result = await getStudents().then(students=>{
      setStudents(students);
      console.log(students);
      toast("Students fetched successfully");
    })
    return result;
  }
  return (
    <div className='p-7'>
      <h2 className='font-bold text-2xl flex justify-between items-center'>
        Students
        <AddNewStudent  refreshData= {displayStudents}/>
      </h2>
      <StudentListTable studentList={students} refreshData ={displayStudents}/>
    </div>
  );
};

export default Students;
