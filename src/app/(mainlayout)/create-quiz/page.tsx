"use client";

import CreateQuestion from "@/components/CreateQuiz/CreateQuestion";
import React from "react";



const CreateQuizPage = () => {
  return (
    <div className="pt-28 pb-10 px-8 mx-auto max-w-screen-2xl min-h-[80vh]">
      <div className="flex items-start flex-wrap mb-5">
        <h1 className="text-2xl md:text-3xl text-gray-900 dark:text-white font-bold flex-1 whitespace-nowrap">
          Create Quiz ✨
        </h1>
      </div>
      <div className="">
        <CreateQuestion />
      </div>
    </div>
  );
};

export default CreateQuizPage;
