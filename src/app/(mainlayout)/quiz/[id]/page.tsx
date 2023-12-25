"use client";

import Quiz from "@/components/Quiz/Quiz";
import Loader from "@/components/common/Loader";
import { useGetQuizsQuery } from "@/redux/features/quiz/quizApi";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/navigation";
import React from "react";

interface IPageProps {
  params: {
    id: string;
  };
}

const QuizPage = ({ params }: IPageProps) => {
  const router = useRouter();
  const { id } = params;

  const { data, isLoading } = useGetQuizsQuery({ categoryId: id });

  // console.log(data, id);

  if (isLoading)
    return <Loader className="h-[50vh] flex items-end justify-center" />;

  if (data.data.length === 0) {
    return (
      <p className="h-[80vh] text-gray-900 dark:text-white py-20 text-2xl font-bold flex justify-center items-center">
        There is no Quiz try another category
      </p>
    );
  }

  return (
    <div className="pt-28 pb-16 px-8 mx-auto max-w-screen-2xl min-h-[80vh]">
      <Quiz
        data1={{
          ...data,
          questions: data.data
            .map((q: any) => {
              const randomAnswers = [...q.quizAnswers].sort(
                () => 0.5 - Math.random()
              );
              return {
                ...q,
                quizAnswers: randomAnswers,
                QuestionType: 1,
                allowedAnswerLimit: 2,
                currentMode: 1,
              };
            })
            .sort(() => 0.5 - Math.random()),
        }}
        categoryId={id}
      />
    </div>
  );
};

export default QuizPage;
