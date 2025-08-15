"use client";

import React, { useContext } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/ui/select";
import { Input } from '@/app/ui/input';
import { UserInputContext } from '@/app/_context/UserInputContext';

function SelectOption() {
    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

    const handleSelectChange = (name, value) => {
        setUserCourseInput(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserCourseInput(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="mt-10 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-center">Course Options</h2>
            <p className="text-gray-500 mt-2 text-center">
                Select the difficulty, duration, and other options for your course.
            </p>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-8 mt-8'>
                <div>
                    <label className="text-lg font-semibold">Difficulty Level</label>
                    <Select onValueChange={(v) => handleSelectChange('difficulty', v)} value={userCourseInput?.difficulty}>
                        <SelectTrigger className="w-full mt-2">
                            <SelectValue placeholder="Select Difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Advance">Advance</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className="text-lg font-semibold">Course Duration</label>
                    <Select onValueChange={(v) => handleSelectChange('duration', v)} value={userCourseInput?.duration}>
                        <SelectTrigger className="w-full mt-2">
                            <SelectValue placeholder="Select Duration" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Short">Short (~1-5 Hours)</SelectItem>
                            <SelectItem value="Medium">Medium (5-10 Hours)</SelectItem>
                            <SelectItem value="Long">Long (10+ Hours)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className="text-lg font-semibold">Include Video</label>
                    <Select onValueChange={(v) => handleSelectChange('video', v)} value={userCourseInput?.video}>
                        <SelectTrigger className="w-full mt-2">
                            <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label htmlFor="chapters" className="text-lg font-semibold">Number of Chapters</label>
                    <Input 
                        id="chapters"
                        name="chapters"
                        type="number" 
                        placeholder="e.g., 5"
                        value={userCourseInput?.chapters || ''}
                        onChange={handleInputChange}
                        className="w-full mt-2"
                    />
                </div>
            </div>
        </div>
    );
}

export default SelectOption;
