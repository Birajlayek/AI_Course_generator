import { Button } from '@/components/ui/button'
import Image from "next/image";
import React from 'react'

function Header() {
  return (
    <div className='flex justify-between p-5 shadow-sm'>
       <Image src={'/next.svg'} width={150} height={100} alt='Next.js Logo'/>
       <Button> Get Started</Button>
    </div>
  )
}

export default Header