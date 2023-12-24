"use client";

import Quiz from "@/components/Quiz/Quiz";
import { useRouter } from "next/navigation";
import React from "react";

interface IPageProps {
  params: {
    id: string;
  };
}

const QuizPage = ({ params }: IPageProps) => {
  const router = useRouter();
  const { id } = params;

  return (
    <div className="pt-28 pb-16 px-8 mx-auto max-w-screen-2xl min-h-[80vh]">
      <Quiz quizId={id} />
    </div>
  );
};

export default QuizPage;
