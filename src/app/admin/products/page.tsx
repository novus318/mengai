
'use client'
import Sidebar from '@/components/admin/Sidebar'
import React from 'react'

const page = () => {
  return (
    <div className="grid min-h-screen w-full overflow-hidden lg:grid-cols-[270px_1fr]">
    <div className="hidden border-r  lg:block">
      <div className="flex flex-col gap-2">
        <Sidebar />
      </div>
    </div>
    <div className="flex flex-col">

    </div>
    </div>
  )
}

export default page
