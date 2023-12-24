"use client";

import Select from "@/components/common/Select";
import Image from "next/image";
import React from "react";
import Profile from "../../../../public/avatar-04.jpg";

const categoryData = [
  { text: "Select Category", value: "" },
  { text: "React", value: "id" },
  { text: "HTML", value: "id" },
  { text: "CSS", value: "id" },
  { text: "Javascript", value: "Armenian" },
];

const LeaderBoardPage = () => {
  return (
    <div className="pt-28 pb-10 px-8 mx-auto max-w-screen-2xl min-h-[80vh]">
      <div className="flex items-start flex-wrap mb-5">
        <h1 className="text-2xl md:text-3xl text-gray-900 dark:text-white font-bold flex-1 whitespace-nowrap">
          Leader Board ✨
        </h1>
        <Select
          className="text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer"
          type="language"
          options={categoryData}
          // defaultValue={createCourseForm.data.language}
          // onChange={({ target }) =>
          //   setCreateCourseFormData({ language: target.value })
          // }
        />
      </div>
      <div className="bg-white border border-blue-200 rounded-lg dark:bg-gray-800 dark:border-blue-700 shadow-md shadow-blue-200 dark:shadow-blue-500 p-6 min-h-[55vh]">
        <div className="grid grid-cols-3 justify-between px-5 pb-3 gap-5 text-gray-900 dark:text-white text-lg font-bold">
          <p>NAME</p>
          <p className="text-center">CORRECT ANSWER</p>
          <p className="text-right">MARK</p>
        </div>
        <>
          <li className="grid grid-cols-3 items-center gap-5 px-5 py-3 bg-slate-100 shadow rounded-lg border border-slate-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">
            <div className="flex items-center gap-5">
              <h3 className="text-lg font-semibold">1</h3>
              <Image
                className="block mb-4 sm:mb-0 md:w- xl:w-auto shrink-0 rounded-full"
                src={Profile}
                alt="title"
                priority={true}
                quality={100}
                width="55"
                height="55"
              />

              <h3 className="text-lg font-semibold">Khairul Alam</h3>
            </div>
            <p className="text-lg font-semibold text-center">8/10</p>
            <p className="text-lg font-semibold text-right">8</p>
          </li>
        </>
      </div>
    </div>
  );
};

export default LeaderBoardPage;
