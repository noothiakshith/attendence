"use client"
import React, { useEffect } from 'react'
import { useTheme } from "next-themes"
import { ModeToggle } from '@/components/mode-toggle'

const Dashboard = () => {
  return (
    <div>Dashboard
      <ModeToggle/>
    </div>
  )
}

export default Dashboard