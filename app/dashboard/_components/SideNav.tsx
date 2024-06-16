"use client"
import React from 'react'
import { GraduationCap, Hand, LayoutIcon, Settings } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth, useUser } from '@clerk/nextjs'


const SideNav = () => {
 const { user } = useUser();
    const mountList = ()=>[
        {
            id:1,
            name:'Dashboard',
            icon:LayoutIcon,
            path:'/dashboard'
          },
          {
            id:2,
            name:'Students',
            icon:GraduationCap,
            path:'/dashboard/students'
          },
          {
            id:3,
            name:'Attendance',
            icon:Hand,
            path:'/dashboard/attendence'
          },
          {
            id:4,
            name:'Settings',
            icon:Settings,
            path:'/dashboard/settings'
          },
    ]
  return (
    <> 
            <div className='border shadow-md h-screen p-5'>
            <Image src={'./logo.svg'}width={24} height={24} alt='logo'/>
            <hr className='my-5'></hr>
            {mountList().map((item,index)=>{
            return(
              <Link href={item.path} key={index}>
                <h2 className={`flex items-center gap-3 text-md p-4 text-slate-500 hover:bg-primary  hover:text-white
          cursor-pointer
          rounded-lg
          my-2`}><item.icon/>{item.name}</h2>
              </Link>
            )
        })}
    </div>
    <div className='flex gap-2 items-center bottom-5 fixed p-2'>
        <div>
            <h2 className='text-sm font-bold'>{user?.firstName}{user?.lastName}</h2>
        </div>
    </div>
    </>

    
  )
}

export default SideNav