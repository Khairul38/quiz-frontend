"use client";

import Select from "@/components/common/Select";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Profile from "../../../assets/avatar-04.jpg";
import { useGetLeaderBoardsQuery } from "@/redux/features/leaderBoard/leaderBoardApi";
import { useGetCategoriesQuery } from "@/redux/features/category/categoryApi";
import Loader from "@/components/common/Loader";

// const categoryData = [
//   { text: "Select Category", value: "" },
//   { text: "React", value: "id" },
//   { text: "HTML", value: "id" },
//   { text: "CSS", value: "id" },
//   { text: "Javascript", value: "Armenian" },
// ];

const LeaderBoardPage = () => {
  const [categoryID, setCategoryId] = useState("");
  const { data: categoryData, isLoading: categoryLoad } = useGetCategoriesQuery(
    {}
  );
  const { data: leaderBoardData, isLoading: leaderBoardLoad } =
    useGetLeaderBoardsQuery({
      categoryId: categoryID,
    });

  console.log(categoryID, leaderBoardData);

  if (categoryLoad || leaderBoardLoad)
    return <Loader className="h-[50vh] flex items-end justify-center" />;
  return (
    <div className="pt-28 pb-10 px-8 mx-auto max-w-screen-2xl min-h-[80vh]">
      <div className="flex items-start flex-wrap mb-5">
        <h1 className="text-2xl md:text-3xl text-gray-900 dark:text-white font-bold flex-1 whitespace-nowrap">
          Leader Board ✨
        </h1>
        <Select
          className="text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer"
          type="language"
          options={[
            { text: "All", value: "" },
            ...categoryData?.data.map((cd: any) => ({
              text: cd.name,
              value: cd.id,
            })),
          ]}
          defaultValue={"CSS"}
          onChange={({ target }) => setCategoryId(target.value)}
        />
      </div>

      <div className="bg-white border border-blue-200 rounded-lg dark:bg-gray-800 dark:border-blue-700 shadow-md shadow-blue-200 dark:shadow-blue-500 p-6 min-h-[55vh]">
        <div className="grid grid-cols-3 justify-between px-5 pb-3 gap-5 text-gray-900 dark:text-white text-lg font-bold">
          <p>NAME</p>
          <p className="text-center">CORRECT ANSWER</p>
          <p className="text-right">MARK</p>
        </div>

        <div className="space-y-4">
          {leaderBoardData?.data?.map((lbd: any, index: any) => (
            <li
              key={index}
              className="grid grid-cols-3 items-center gap-5 px-5 py-3 bg-slate-100 shadow rounded-lg border border-slate-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
            >
              <div className="flex items-center gap-5">
                <h3 className="text-lg font-semibold">{index + 1}</h3>
                <Image
                  className="block mb-4 sm:mb-0 md:w- xl:w-auto shrink-0 rounded-full"
                  src={lbd?.user?.profileImg ? lbd?.user?.profileImg : Profile}
                  alt="title"
                  priority={true}
                  quality={100}
                  width="55"
                  height="55"
                />

                <h3 className="text-lg font-semibold">{lbd?.user?.name}</h3>
              </div>
              <p className="text-lg font-semibold text-center">
                {lbd?.correctlyAnswer}
              </p>
              <p className="text-lg font-semibold text-right">
                {lbd?.totalMark}
              </p>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeaderBoardPage;
