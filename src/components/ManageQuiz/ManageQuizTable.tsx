import React, { useEffect } from "react";
import { TableCell, TableRow } from "../common/Table";
import { HiPencil, HiTrash } from "react-icons/hi";
import Loader from "../common/Loader";
import { useRouter } from "next/navigation";
import { useDeleteQuizMutation } from "@/redux/features/quiz/quizApi";
import { notify } from "../common/Toastify";

const ManageQuizTable = ({ quiz, index }: { quiz: any; index: number }) => {
  const router = useRouter();
  // console.log(quiz);
  const [deleteQuiz, { isSuccess, isLoading: deleteLoad, error }] =
    useDeleteQuizMutation();

  useEffect(() => {
    if (error) {
      notify("error", (error as any)?.data?.message);
    }
    if (isSuccess) {
      notify("success", "Quiz deleted successfully");
    }
  }, [isSuccess, error]);
  return (
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
        <span className="ml-5 font-medium">
          {`${index + 1}. `}
          {quiz.question}
        </span>
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
  );
};

export default ManageQuizTable;
