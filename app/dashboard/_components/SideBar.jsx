"use client";

import Link from 'next/link';
import React from 'react';
import Image from "next/image";
import { IoHome } from "react-icons/io5";
import { GoStack } from "react-icons/go";
import { HiOutlineShieldCheck } from "react-icons/hi";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { usePathname } from 'next/navigation';
import { Progress } from '@/app/ui/progress';

function SideBar() {
  const menu = [
    {
        id: 1,
        name: 'Home',
        icon: <IoHome className="h-6 w-6"/>, 
        path: '/dashboard'
    },
    {
        id: 2,
        name: 'Explore',
        icon: <GoStack className="h-6 w-6"/>, 
        path: '/dashboard/explore'
    },
    {
        id: 3,
        name: 'Upgrade',
        icon: <HiOutlineShieldCheck className="h-6 w-6"/>, 
        path: '/dashboard/upgrade'
    },
    {
        id: 4,
        name: 'Logout',
        icon: <MdOutlinePowerSettingsNew className="h-6 w-6"/>, 
        path: '/dashboard/logout'
    }
  ];
    
  const path = usePathname();

  return (
    <div className='fixed h-full md:w-64 p-5 border-r'>
        <Image src={'/next.svg'} width={160} height={100} alt="Company Logo"/>
        <hr className='my-5'/>
        <div className='mt-5 flex flex-col gap-2'>
            {menu.map((item) => (
                <Link href={item.path} key={item.id}>
                  <div 
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700
                      ${path === item.path ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-black'}
                    `}
                  >
                      {item.icon}
                      <span className='text-lg'>{item.name}</span>
                  </div>
                </Link>
            ))}
        </div>
        <div className='absolute bottom-10 w-[80%]'>
            <Progress value={33} />
            <h2 className='text-sm my-2'> 3 Out of 5 Course created</h2>
            <h2 className='text-xs text-gray-500'>Upgrade your plan for unlimited course generate</h2>
        </div>
    </div>
  )
}

export default SideBar;