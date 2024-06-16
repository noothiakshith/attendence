import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import moment from 'moment';
import { makepresent } from '@/lib/actions/form.action';
import { toast } from 'sonner';


const AttendenceGrid = ({ attendenceList,selectedMonth}: { attendenceList: any , selectedMonth:any }) => {
  const [rowData, setRowData] = useState<any[]>([]);
  const [colDefs, setColDefs] = useState([
    {field:'studentId'},
    { field: "name" },
  ]);
  const daysInmonth = (year: any,month: any)=> new Date(year,month+1,0).getDate();
  const numberOfDays = daysInmonth(moment(selectedMonth).format('yyyy'),moment(selectedMonth).format('MM'));
  console.log(numberOfDays);
  const daysArrays = Array.from({length:numberOfDays},(_,i)=>i+1);
  useEffect(() => {
    if(attendenceList){
            const userList = getUniqueRecord();
    setRowData(userList);
    daysArrays.forEach((date)=>{
        setColDefs(prevData =>[...prevData,{
            field:date.toString(),width:50,editable:true
        }])
        userList.forEach(obj=>{
            obj[date]=isPresent(obj.studentId,date)
        })
    })
    }
  }, [attendenceList]);
  const isPresent=(studentId:any,day:any)=>{
    const result=attendenceList.find((item: { day: any; studentId: any; })=>item.day==day&&item.studentId==studentId)
    return result?true:false
}

const onMarkAttendence= async (day:any,studentId:any,presentStatus:any)=>{
    const date= moment(selectedMonth).format('MM/yyyy')
    if(presentStatus){
        const data = {
            day:day,
            studentId:studentId,
            present:presentStatus,
            date:date
        }
        const result = await makepresent(data).then(
            resp =>{
                console.log("osidfsdofh")
                toast("updated")
            }
        )
    }
}

  const getUniqueRecord = () => {
    const uniqueRecord: any[] = [];
    const existingUser = new Set();

    attendenceList?.forEach((record: any) => {
      if (!existingUser.has(record.studentId)) {
        existingUser.add(record.studentId);
        uniqueRecord.push(record);
      }
    });

    return uniqueRecord;
  };
  return (
    <div className="ag-theme-quartz" style={{ height: '500px', width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={colDefs}
        onCellValueChanged={(e:any)=>onMarkAttendence(e.colDef.field,e.data.studentId,e.newValue)}
      />
    </div>
  );
};

export default AttendenceGrid;
