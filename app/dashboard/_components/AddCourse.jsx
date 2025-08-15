"use client"
import { useUser } from '@clerk/nextjs'
import React from 'react'
import { Button } from '@/components/ui/button';
import Link from 'next/link'
function AddCourse() {
    const {user}=useUser();
  return (
    <div className='flex items-center justify-between'>
        <div>
            <h2 className='text-2xl'>Hello,
                <span className='font-bold'>{user?.fullName}</span>
                
            </h2>
            <p>Create new course with AI Share with friends</p>
        </div>
        <Link href={'/create-course'}>
        <Button>
            + Create AI Course
        </Button>
        </Link>
    </div>
  )
}

export default AddCourse