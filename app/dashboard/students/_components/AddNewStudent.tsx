"use client"

import GlobalApi from "@/app/_services/GlobalApi"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { addNewStudent } from "@/lib/actions/form.action"
import { LoaderIcon } from "lucide-react"
import { useEffect, useState } from "react"
import {useForm} from 'react-hook-form'
const AddNewStudent = ({refreshData}:{refreshData:any}) => {
  const[open,setOpen] = useState(false);
  const[grades,setGrades] = useState([]);
  const[loading,setLoading] = useState(false);
  const{
    register,handleSubmit,reset,formState:{errors},
  } = useForm()

  useEffect(()=>{
    GetallGradesList();
  },[])

  const GetallGradesList = ()=>{
    GlobalApi?.GetAllGrades().then(resp=>{
      setGrades(resp.data)
    })
  }

  const onSubmit =  async (data:any)=>{
     const result = await addNewStudent(data);
     console.log(result);
     console.log("sucessful")
     toast("Student Added Successfully");
     refreshData();
  }
  return (
    <div>
      <Button onClick={()=>setOpen(true)}>+Add New Student</Button>
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new Student</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="py-2">
                  <label>FUll Name</label>
                  <Input placeholder="exho" {...register('name',{required:true})}/>
                </div>
                <div className="flex flex-col py-2">
                  <label>Select Grade</label>
                  <select className="p-3 border rounded-lg" {...register('grade',{required:true})}>
                    {grades.map((item,index)=>(
                      <option key={index} value={item.grade}>{item.grade}</option>
                    ))}
                  </select>
                </div>
                <div className="py-2">
                  <label>Contact Number</label>
                  <Input type="number" placeholder="exlfdksj" {...register('contact')}/>
                </div>
                <div className="py-2">
                  <label>Address</label>
                  <Input placeholder="alsdkfjk" {...register('address')}/>
                </div>
                <div className="flex gap-3 items-center justify-end mt-5">
                  <Button onClick={()=>setOpen(false)} variant="ghost">Cancel</Button>
                  <Button type="submit" onClick={()=>setOpen(false)} disable={loading}>
                    {loading ? <LoaderIcon className="animate-spin"/> : "Save"}
                    </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddNewStudent