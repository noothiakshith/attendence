"use client"
import GradeSelect from '@/app/_components/GradeSelect'
import MonthSelection from '@/app/_components/MonthSelection'
import GlobalApi from '@/app/_services/GlobalApi'
import { Button } from '@/components/ui/button'

import moment from 'moment'
import React, { useState } from 'react'
import AttendenceGrid from './_components/AttendenceGrid'
import { getAttendance } from '@/lib/actions/form.action'
function Attendance() {

  const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [selectedGrade,setSelectedGrade]=useState('5th');
   const [attendanceList, setAttendceList] = useState<{ 
    name: string;
    present: boolean | null;
    studentId: number;
    day: number | null;
    date: string | null;
    grade: string;
    attendanceId: number | null;
  }[]>([]);

    /**
     * Used to fetch attendance list for give month and Grade
     */
    const onSearchHandler = async () => {
        console.log(selectedMonth, selectedGrade);
        const month = moment(selectedMonth).format('MM/YYYY');
        
        try {
          const resp = await getAttendance(selectedGrade, month);
          console.log(resp); // Verify the response structure
          setAttendceList(resp); // Update state with the fetched attendance data
          console.log(attendanceList); // This may log the previous state due to closure
          console.log("Updated attendanceList:", attendanceList); // This may also log the previous state due to closure
        } catch (error) {
          console.error("Error fetching attendance:", error);
          // Handle error as needed
        }
      };
      
    return (
        <div className='p-10'>
            <h2 className='text-2xl font-bold'>Attendance</h2>
            {/* Search option  */}

            <div className='flex gap-5 my-5 p-5 border rounded-lg shadow-sm'>
                <div className='flex gap-2 items-center'>
                    <label>Select Month:</label>
                    <MonthSelection selectedMonth={(value:any)=>setSelectedMonth(value)} />
                </div>
                <div className='flex gap-2 items-center'>
                    <label>Select Grade:</label>
                    <GradeSelect selectedGrade={(v:any)=>setSelectedGrade(v)} />
                </div>
                <Button
                onClick={()=>onSearchHandler()}
                >Search</Button>
            </div>

            {/* Student Attendance Grid  */}
           <AttendenceGrid attendenceList={attendanceList}
           selectedMonth={selectedMonth}
           
           />
        </div>
    )
}

export default Attendance