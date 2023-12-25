"use client";

import CreateQuestion from "@/components/CreateQuiz/CreateQuestion";
import Loader from "@/components/common/Loader";
import { useGetCategoriesQuery } from "@/redux/features/category/categoryApi";
import React from "react";



const CreateQuizPage = () => {
  const { data, isLoading } = useGetCategoriesQuery({});

   if (isLoading) return <Loader className="h-[50vh] flex items-end justify-center" />;
  return (
    <div className="pt-28 pb-10 px-8 mx-auto max-w-screen-2xl">
      <div className="flex items-start flex-wrap mb-5">
        <h1 className="text-2xl md:text-3xl text-gray-900 dark:text-white font-bold flex-1 whitespace-nowrap">
          Create Quiz ✨
        </h1>
      </div>
      <div className="">
        <CreateQuestion
          categoryOption={data?.data.map((cd: any) => ({
            text: cd.name,
            value: cd.id,
          }))}
        />
      </div>
    </div>
  );
};

export default CreateQuizPage;
