"use client"

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

  return <div>This is quiz page {id}</div>;
};

export default QuizPage;
