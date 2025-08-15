"use client";

import React, { useContext } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { UserInputContext } from '@/app/_context/UserInputContext';

function TopicDescription() {
    const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserCourseInput(prev => ({
            ...prev,
            [name]: value
        }));
    };

    return (
        <div className="mt-10 max-w-2xl mx-auto">
            <div className="space-y-8">
                <div className="space-y-2">
                    <label htmlFor="topic" className="text-lg font-semibold">
                        Write the topic for which you want to generate the course
                    </label>
                    <p className="text-gray-500 text-sm">(e.g., Python, Yoga, etc.)</p>
                    <Input
                        id="topic"
                        name="topic"
                        value={userCourseInput?.topic || ''}
                        onChange={handleInputChange}
                        placeholder="Topic"
                        className="mt-2"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="description" className="text-lg font-semibold">
                        Write a brief description of what you want to cover
                    </label>
                    <p className="text-gray-500 text-sm">(Optional)</p>
                    <Textarea
                        id="description"
                        name="description"
                        value={userCourseInput?.description || ''}
                        onChange={handleInputChange}
                        placeholder="e.g., About your course."
                        className="mt-2"
                    />
                </div>
            </div>
        </div>
    );
}

export default TopicDescription;