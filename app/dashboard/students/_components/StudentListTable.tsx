import React, { useEffect } from 'react'
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Trash } from 'lucide-react';
import { deleteStudent } from '@/lib/actions/form.action';
import { toast } from 'sonner';


const StudentListTable = ({studentList,refreshData}:{studentList:any,refreshData:any}) => {
    const CustonButtons = (props:any)=>{
        const{data} = props;
        return(
            <AlertDialog>
  <AlertDialogTrigger>
    <Button size="sm" variant="destructive"><Trash/></Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={()=>DeleteRecord(props?.data?.id)}>
        Continue
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

        )
    }
    const[colDefs,setcolDefs] = useState([
            {field:'id',filter:true},
            {field:'name',filter:true},
            {field:'grade',filter:true},
            {field:'address',filter:true},
            {field:'contact',filter:true},
            {field:'actions',cellRenderer:CustonButtons}
        
    ]);
    const[rowData,setRowData] = useState();
    const[searchInput,setSearchInput] = useState('');
    useEffect(()=>{
        studentList&&setRowData(studentList);
    },[studentList])

 const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];
const DeleteRecord =  async (id:any)=>{
    const result = await deleteStudent({id:id});
    console.log(result);
    toast("Student Deleted Successfully");
    refreshData();
}
  return (
    <div className='my-7'>
        <div
  className="ag-theme-quartz" // applying the grid theme
  style={{ height: 500 }} // the grid will fill the size of the parent container
 >
    <div className='p-2 rounded-lg border shadow-sm flex gap-2 mb-4 max-ws-sm'>
        <Search/>
        <Input type='text' placeholder='enter the name' className='outline-none w-full' onChange={(event)=>{setSearchInput(event?.target?.value)}}/>
    </div>
   <AgGridReact
       rowData={rowData}
       columnDefs={colDefs}
       quickFilterText={searchInput}
       pagination={pagination}
       paginationPageSize={paginationPageSize}
       paginationPageSizeSelector={paginationPageSizeSelector}
   />
 </div>
    </div>
  )
}

export default StudentListTable