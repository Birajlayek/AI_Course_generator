"use client";

import React, { useContext } from 'react';
import Image from 'next/image';
import CategoryList from '@/app/_shared/CategoryList';
import { UserInputContext } from '@/app/_context/UserInputContext';

function SelectCategory() {
    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

    const handleCategoryChange = (categoryName) => {
        setUserCourseInput(prev => ({
            ...prev,
            category: categoryName
        }));
    };

    return (
        <div className="mt-10">
            <h2 className="text-2xl font-semibold text-center">Select a Category</h2>
            <p className="text-gray-500 mt-2 text-center">
                Choose a category that best fits the course you want to create.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {CategoryList.map((item) => (
                    <div 
                        key={item.id}
                        onClick={() => handleCategoryChange(item.name)}
                        className={`flex flex-col items-center justify-center p-6 border rounded-lg cursor-pointer transition-all hover:bg-gray-50 hover:border-purple-300 hover:shadow-lg
                            ${userCourseInput?.category === item.name ? 'bg-purple-100 border-purple-500 ring-2 ring-purple-500' : ''}`}
                    >
                        <Image 
                            src={item.icon} 
                            width={50} 
                            height={50} 
                            alt={item.name}
                            onError={(e) => { e.target.src = 'https://placehold.co/50x50/purple/white?text=?'; }}
                        />
                        <h3 className="mt-3 font-medium text-center">{item.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SelectCategory;
