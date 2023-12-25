"use client";

import Button from "@/components/common/Button";
import Loader from "@/components/common/Loader";
import Select from "@/components/common/Select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/common/Table";
import { notify } from "@/components/common/Toastify";
import { useGetCategoriesQuery } from "@/redux/features/category/categoryApi";
import {
  useDeleteQuizMutation,
  useGetQuizsQuery,
  useUpdateQuizMutation,
} from "@/redux/features/quiz/quizApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { HiPlus, HiPencil, HiTrash } from "react-icons/hi";

const categoryData = [
  { text: "Select Category", value: "" },
  { text: "React", value: "id" },
  { text: "HTML", value: "id" },
  { text: "CSS", value: "id" },
  { text: "Javascript", value: "Armenian" },
];

const data = [
  {
    id: "22",
    QuestionType: 1,
    currentMode: 1,
    multiChoice: false,
    sectionQuizId: "21",
    mark: 1,
    question: "Full form of SQL is?",
    answers: [
      {
        id: "23",
        answer: "Storage Query Language",
        explanation: "sdfdsf",
        istrue: false,
      },
      {
        id: "24",
        answer: "Structured Quote Language",
        explanation: "sdfdsf",
        istrue: false,
      },
      {
        id: "36",
        answer: "Structured Query Language",
        explanation: "sdfdsf",
        istrue: false,
      },
      {
        id: "46",
        answer: "Storage Quest Language",
        explanation: "sdfdsf",
        istrue: true,
      },
    ],
  },
  {
    id: "2556",
    QuestionType: 1,
    currentMode: 1,
    multiChoice: false,
    sectionQuizId: "21",
    mark: 1,
    question: "DBMS stands for?",
    answers: [
      {
        id: "156",
        answer: "Database manipulation system",
        explanation: "sdfdsf",
        istrue: false,
      },
      {
        id: "256",
        answer: "Database management system",
        explanation: "sdfdsf",
        istrue: false,
      },
      {
        id: "356",
        answer: "Datahouse management system",
        explanation: "sdfdsf",
        istrue: true,
      },
      {
        id: "456",
        answer: "Datahouse management system",
        explanation: "sdfdsf",
        istrue: false,
      },
    ],
  },
];

const ManageQuizPage = () => {
  const router = useRouter();
  const [categoryID, setCategoryId] = useState(
    "32d7dd53-6572-49b6-9a12-f6b4094c974a"
  );
  const { data: categoryData, isLoading: categoryLoad } = useGetCategoriesQuery(
    {}
  );
  const { data: leaderBoardData, isLoading: leaderBoardLoad } =
    useGetQuizsQuery({
      categoryId: categoryID,
    });

  // const [updateQuiz, { isSuccess:quizUpdateSuccess, isLoading:updateLoad, isError, error }] =
  //   useUpdateQuizMutation();

  const [deleteQuiz, { isSuccess, isLoading: deleteLoad, error }] =
    useDeleteQuizMutation();

  // console.log(categoryData, leaderBoardData);

  useEffect(() => {
    if (error) {
      notify("error", (error as any)?.data?.message);
    }
    if (isSuccess) {
      notify("success", "Quiz deleted successfully");
    }
  }, [isSuccess, error]);

  if (categoryLoad || leaderBoardLoad)
    return <Loader className="h-[50vh] flex items-end justify-center" />;

  return (
    <div className="pt-28 pb-16 px-8 mx-auto max-w-screen-2xl min-h-[80vh]">
      <div className="flex items-start flex-wrap mb-5">
        <h1 className="text-2xl md:text-3xl text-gray-900 dark:text-white font-bold flex-1 whitespace-nowrap">
          All Quiz ✨
        </h1>
        {/* <Button
          // icon={<HiPlus />}
          type="button"
          // onClick={() => {
          //   router.push(
          //     "/company/certification-courses/create-course/initial-info"
          //   );
          //   setCreateCourseForm(DEFAULT_CREATE_COURSE_FORM);
          //   localStorage.removeItem("courseId");
          //   localStorage.removeItem("status");
          // }}
        >
          Create New
        </Button> */}

        <Select
          className="text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer"
          type="language"
          options={categoryData?.data.map((cd: any) => ({
            text: cd.name,
            value: cd.id,
          }))}
          // defaultValue={createCourseForm.data.language}
          onChange={({ target }) => setCategoryId(target.value)}
        />
      </div>
      <div className="w-full">
        <Table
          title="Showing all quiz that you have created"
          count={`(${leaderBoardData?.data?.length})`}
        >
          <TableHead>
            <TableRow>
              {/* <TableCell head shrink></TableCell> */}
              <TableCell head shrink left>
                <span className="ml-5">Question</span>
              </TableCell>
              <TableCell head shrink>
                Mark
              </TableCell>
              {/* <TableCell head>Progress</TableCell> */}
              <TableCell head shrink right>
                <span className="mr-5">Action</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderBoardData?.data?.map((quiz: any) => (
              <TableRow key={quiz.id}>
                {/* <TableCell>
                  <div className="w-10 h-10 rounded-md shadow-md overflow-clip">
                    <img
                      src="../../../assets/avatar-04.jpg"
                      className="w-full h-full object-cover shrink-0"
                      alt="quiz image"
                    />
                  </div>
                </TableCell> */}
                <TableCell>
                  <span className="ml-5 font-medium">{quiz.question}</span>
                </TableCell>
                <TableCell>
                  {/* <ToggleSwitch
                    id={quiz.id}
                    value={quiz.isActive}
                    text={quiz.isActive ? "Public" : "Private"}
                    onChange={() =>
                      handleUpdateVisibility(quiz.id, quiz.isActive)
                    }
                  /> */}
                  <p className="text-gray-900 dark:text-gray-300 text-center ">
                    {/* {quiz.isActive ? "Public" : "Private"} */}
                    {quiz.mark}
                  </p>
                </TableCell>
                {/* <TableCell>
                  <div className="flex space-x-3 items-center px-5">
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-clip">
                      <div
                        className="h-full bg-indigo-500"
                        style={{ width: `${quiz.progress}%` }}
                      />
                    </div>
                    <span className="font-medium text-slate-500 text-xs">
                      {quiz.progress}%
                    </span>
                  </div>
                </TableCell> */}
                <TableCell>
                  <div className="mr-5">
                    <span className="flex justify-end w-full space-x-5">
                      <HiPencil
                        onClick={() => {
                          router.push(`/update-quiz/${quiz.id}`);
                        }}
                        size={22}
                        className="text-slate-500 cursor-pointer dark:text-gray-300"
                      />
                      {deleteLoad ? (
                        <Loader className="w-[22px]" color="text-red-500" />
                      ) : (
                        <HiTrash
                          onClick={() => {
                            deleteQuiz(quiz.id);
                          }}
                          size={22}
                          className="text-red-500 cursor-pointer"
                        />
                      )}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ManageQuizPage;
