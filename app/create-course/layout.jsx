"use client";

import React, { useState, useEffect } from 'react';
import Header from '../dashboard/_components/Header';
import { UserInputContext } from '@/app/_context/UserInputContext';

function CreateCourseLayout({ children }) {
  // Corrected: Initialize state with all possible fields
  const [userCourseInput, setUserCourseInput] = useState({
    category: '',
    topic: '',
    description: '',
    difficulty: '',
    duration: '',
    video: '',
    chapters: ''
  });

  useEffect(() => {
    // You can still see the state changes in the browser console
    console.log(userCourseInput);
  }, [userCourseInput]);

  return (
    <div>
      <UserInputContext.Provider value={{ userCourseInput, setUserCourseInput }}>
        <Header />
        {children}
      </UserInputContext.Provider>
    </div>
  );
}

export default CreateCourseLayout;
