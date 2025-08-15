"use client";

import React, { useState, useContext } from "react";
import { MdDescription } from "react-icons/md";
import { TbCategoryFilled, TbHttpOptions } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import SelectCategory from "./_components/SelectCategory";
import TopicDescription from "./_components/TopicDescription";
import SelectOption from "./_components/SelectOption";
import { UserInputContext } from "@/app/_context/UserInputContext";
import { useChat } from 'ai/react';

function Page() {
  const stepperOptions = [
    { id: 1, name: "Category", icon: <TbCategoryFilled className="h-6 w-6" /> },
    { id: 2, name: "Topic & Desc", icon: <MdDescription className="h-6 w-6" /> },
    { id: 3, name: "Options", icon: <TbHttpOptions className="h-6 w-6" /> },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const { userCourseInput } = useContext(UserInputContext);

  const { messages, setInput, handleSubmit, isLoading } = useChat({
    api: '/api/generate',
    onFinish: (message) => {
      console.log("--- Received Final AI Response ---");
      try {
        const courseJson = JSON.parse(message.content);
        console.log("--- Parsed Course JSON ---");
        console.log(courseJson);
      } catch (e) {
        console.error("Failed to parse the final AI response:", message.content, e);
      }
    },
    onError: (error) => {
      console.error("AI Generation failed:", error);
    }
  });

  const handleGenerateCourse = (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();

    const BASIC_PROMPT = `Generate a detailed course tutorial based on the following user-provided details. The output should be a JSON object with the following fields: "courseName", "courseDescription", and an array of "chapters". Each chapter object in the array should have a "chapterName", "aboutChapter", and "durationInMinutes".`;
    
    const USER_INPUT_PROMPT = `
Category: ${userCourseInput?.category || "General"},
Topic: ${userCourseInput?.topic || "Not specified"},
Difficulty Level: ${userCourseInput?.difficulty || "Beginner"},
Course Duration: ${userCourseInput?.duration || "Not specified"},
Number of Chapters: ${userCourseInput?.chapters || "5"},
Include Video Tutorials: ${userCourseInput?.video || "No"}`;

    const FINAL_PROMPT = `${BASIC_PROMPT}\n\nUser Input:\n${USER_INPUT_PROMPT}`;
    
    // Set the input for the useChat hook
    setInput(FINAL_PROMPT);

    // Create a new function scope to pass the final prompt to handleSubmit
    const submitPrompt = () => {
        handleSubmit(e, {
            data: {
                prompt: FINAL_PROMPT
            }
        });
    };
    
    // Call the new function
    submitPrompt();
  };

  return (
    <div className="p-10">
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-4xl text-purple-500 font-medium">Create Course</h2>
        <div className="flex items-center w-full max-w-2xl mt-8">
          {stepperOptions.map((item, index) => (
            <React.Fragment key={item.id}>
              <div className="flex flex-col items-center">
                <div className={`p-3 rounded-full text-white ${activeIndex >= index ? "bg-purple-500" : "bg-gray-200"}`}>
                  {item.icon}
                </div>
                <h3 className="mt-2 text-sm font-medium">{item.name}</h3>
              </div>
              {index < stepperOptions.length - 1 && (
                <div className={`flex-1 h-1 mx-4 hidden md:block ${activeIndex > index ? "bg-purple-500" : "bg-gray-300"}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="mt-8">
        {activeIndex === 0 ? <SelectCategory /> : activeIndex === 1 ? <TopicDescription /> : <SelectOption />}
      </div>

      <div className="flex justify-between gap-4 mt-10">
        <Button disabled={activeIndex === 0} onClick={() => setActiveIndex(activeIndex - 1)} variant="outline" className="px-6">
          Previous
        </Button>

        <Button
          disabled={
            isLoading ||
            (activeIndex === 0 && !userCourseInput?.category) ||
            (activeIndex === 1 && !userCourseInput?.topic)
          }
          onClick={(e) => {
            if (activeIndex === stepperOptions.length - 1) {
              handleGenerateCourse(e);
            } else {
              setActiveIndex(activeIndex + 1);
            }
          }}
          className="px-6"
        >
          {activeIndex === stepperOptions.length - 1
            ? (isLoading ? "Generating..." : "Generate Course")
            : "Next"}
        </Button>
      </div>
    </div>
  );
}

export default Page;