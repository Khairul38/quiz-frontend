"use client";

import CreateQuestion from "@/components/CreateQuiz/CreateQuestion";
import Loader from "@/components/common/Loader";
import { useGetCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useGetSingleQuizQuery } from "@/redux/features/quiz/quizApi";
import { useRouter } from "next/navigation";
import React from "react";

interface IPageProps {
  params: {
    id: string;
  };
}

const UpdateQuizPage = ({ params }: IPageProps) => {
  const router = useRouter();
  const { id } = params;

  const { data: quizData, isLoading: quizLoad } = useGetSingleQuizQuery(id);

  const { data, isLoading: categoryLoad } = useGetCategoriesQuery({});

  if (quizLoad || categoryLoad)
    return <Loader className="h-[50vh] flex items-end justify-center" />;
  return (
    <div className="pt-28 pb-10 px-8 mx-auto max-w-screen-2xl">
      <div className="flex items-start flex-wrap mb-5">
        <h1 className="text-2xl md:text-3xl text-gray-900 dark:text-white font-bold flex-1 whitespace-nowrap">
          Update Quiz ✨
        </h1>
      </div>
      <div>
        <CreateQuestion
          quizData={quizData?.data}
          categoryOption={data?.data.map((cd: any) => ({
            text: cd.name,
            value: cd.id,
          }))}
        />
      </div>
    </div>
  );
};

export default UpdateQuizPage;
