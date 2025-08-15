import React from 'react';
import SideBar from './_components/SideBar';
import Header from './_components/Header'; // Make sure this is imported

function DashboardLayeout({ children }) {
  return (
    <div>
      {/* 1. Make the sidebar's container fixed */}
      <div className='hidden md:block md:w-64 fixed inset-y-0'>
        <SideBar />
      </div>

      {/* 2. Apply a margin to the main content area */}
      <div className='md:ml-64'>
        <Header />
        {/* 3. Apply padding to an inner div, not the main one */}
        <div className='p-10'>
          {children}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayeout;