"use client";

import React, { useEffect, useState } from "react";
// import API from "../../../../../utils/API";
import Button from "../common/Button";
import NumberCircle from "./NumberCircle/NumberCircle";
import OptionalQuestion from "./OptionalQuestion/OptionalQuestion";
import ParagraphQuestion from "./ParagraphQuestion/ParagraphQuestion";
import Timer from "./Timer/Timer";
import WrittenQuestion from "./WrittenQuestion/WrittenQuestion";
import Loader from "../common/Loader";
import { useRouter } from "next/navigation";
import { useCreateLeaderBoardMutation } from "@/redux/features/leaderBoard/leaderBoardApi";
import { IAuthState } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/reduxHooks";
import { notify } from "../common/Toastify";

const data = {
  questions: [
    {
      id: "22",
      QuestionType: 1,
      currentMode: 1,
      multiChoice: false,
      sectionQuizId: "21",
      marks: 1,
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
      marks: 1,
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
  ],
};

interface ScoreResult {
  amount: number;
}

// @ts-ignore
const CourseQuiz = ({ data1, categoryId }) => {
  const [createLeaderBoard, { isLoading, isSuccess, error }] =
    useCreateLeaderBoardMutation();
  const { user } = useAppSelector((state: { auth: IAuthState }) => state.auth);

  //
  const [CurrentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questionSection, setQuestionSection] = useState(data1);
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [score, setScore] = useState({ status: false, amount: 0 });
  const [correctAns, setCorrectAns] = useState(false);
  const [submitQuiz, setSubmitQuiz] = useState(false);
  const router = useRouter();

  // console.log(score, submitQuiz);

  const calculateScore = (): Promise<ScoreResult> => {
    return new Promise<ScoreResult>((resolve) => {
      const result: ScoreResult = { amount: 0 };

      // @ts-ignore
      questionSection.questions.forEach((q) => {
        if (
          selectedAnswer.find(
            // @ts-ignore
            (a) => a.questionId === q.id && a.istrue === false
          ) === undefined
        ) {
          result.amount += q.mark;
          setScore((prev) => ({ ...prev, amount: prev.amount + q.mark }));
        }
      });

      // Resolve the Promise with the result after the calculations are done
      resolve(result);
    });
  };

  const handleSubmit = async (): Promise<void> => {
    try {
      // Wait for the calculateScore function to complete and get the result
      const result = await calculateScore();

      // Access the calculated score from the result
      const calculatedScore = result.amount;

      createLeaderBoard({
        totalMark: calculatedScore,
        correctlyAnswer: `${calculatedScore} / ${
          // @ts-ignore
          questionSection.questions.length
        }`,
        userId: user?.id,
        categoryId,
      });

      if (isSuccess) {
        notify("success", "Quiz submitted successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // @ts-ignore
  const selectedIndexChange = (number) => {
    // @ts-ignore
    changeMode(questionSection.questions[CurrentQuestionIndex], 2);
    setCurrentQuestionIndex(number);
  };

  // @ts-ignore
  const changeMode = (ob, mode) => {
    if (mode > ob.currentMode) {
      ob.currentMode = mode;
    }
  };

  // @ts-ignore
  const currentMode = (number) => {
    // console.log(questionSection.questions[number].currentMode);
    // @ts-ignore
    return questionSection.questions[number].currentMode;
  };

  const selectPrev = () => {
    // // @ts-ignore
    // setCurrentQuestionIndex((prev) => {
    //   // @ts-ignore
    //   changeMode(questionSection.questions[prev], 2);
    //   setCurrentQuestionIndex(prev - 1);
    // });
    changeMode(questionSection.questions[CurrentQuestionIndex], 2);
    setCurrentQuestionIndex(CurrentQuestionIndex - 1);
  };
  const selectNext = () => {
    // @ts-ignore
    // setCurrentQuestionIndex((prev) => {
    //   // @ts-ignore
    //   changeMode(questionSection.questions[prev], 2);
    //   setCurrentQuestionIndex(prev + 1);
    // });
    changeMode(questionSection.questions[CurrentQuestionIndex], 2);
    setCurrentQuestionIndex(CurrentQuestionIndex + 1);
  };

  // @ts-ignore
  const chooseQuestionType = (ob) => {
    // console.log(ob);
    if (ob !== undefined) {
      if (ob.QuestionType == 1) {
        return (
          <OptionalQuestion
            questionNumber={CurrentQuestionIndex}
            totalQuestion={questionSection.questions.length}
            questionSave={questionSave}
            inside={ob}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            correctAns={correctAns}
          ></OptionalQuestion>
        );
      } else if (ob.QuestionType == 2) {
        return (
          <ParagraphQuestion
            questionNumber={CurrentQuestionIndex}
            inside={ob}
          ></ParagraphQuestion>
        );
      } else if (ob.QuestionType == 3) {
        return (
          <WrittenQuestion
            questionNumber={CurrentQuestionIndex}
            questionSave={questionSave}
            inside={ob}
          ></WrittenQuestion>
        );
      } else {
        return (
          <div>
            <p>Error....</p>
          </div>
        );
      }
    }
    return (
      <div>
        <p>Error....</p>
      </div>
    );
  };

  // @ts-ignore
  const questionSave = (ob) => {
    // @ts-ignore
    setCurrentQuestionIndex((prev) => {
      changeMode(ob, 3);
      setCurrentQuestionIndex(
        // @ts-ignore
        CurrentQuestionIndex !== questionSection.questions.length - 1
          ? prev + 1
          : prev
      );
    });
  };

  useEffect(() => {
    if (error) {
      notify("error", (error as any)?.data?.message);
    }
    if (isSuccess) {
      notify("success", "Quiz submitted successfully");
      setScore((prev) => ({ ...prev, status: true }));
      setCorrectAns(false);
      setSubmitQuiz(true);
    }
  }, [isSuccess, error]);

  if (questionSection === undefined)
    return (
      <div className="relative pt-[56.25%]">
        <div className="absolute inset-0 flex justify-center items-center">
          <Loader />
        </div>
      </div>
    );

  if (questionSection !== undefined)
    return (
      <>
        {/* <div className="relative pt-[56.25%]">
          <div className="absolute inset-0 flex justify-center items-center">
            <span>This is Quiz section</span>
          </div>
        </div> */}

        <div className="bg-white border border-blue-200 rounded-lg dark:bg-gray-800 dark:border-blue-700 shadow-md shadow-blue-200 dark:shadow-blue-500 p-6">
          {/* <div className="sticky top-0">
          <QuizHeader />
        </div> */}

          <div className="lg:flex h-[90%]">
            <div className="flex flex-col justify-between lg:basis-9/12">
              {score.status ? (
                <div className="flex items-center justify-center h-full">
                  <div>
                    <div className="text-center bg-slate-100 shadow rounded border border-slate-200 p-10 mb-5 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">
                      <h1 className="text-2xl">Your Score</h1>

                      <p className="text-3xl font-bold">
                        {`${score.amount} / ${
                          // @ts-ignore
                          questionSection.questions.length
                        }`}
                      </p>
                    </div>
                    <Button
                      className="w-full"
                      color="secondary"
                      // @ts-ignore
                      onClick={() => {
                        setCorrectAns(true);
                        setScore((prev) => ({ ...prev, status: false }));
                        setCurrentQuestionIndex(0);
                      }}
                    >
                      See Correct Answer
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div>
                    {chooseQuestionType(
                      // @ts-ignore
                      questionSection.questions[CurrentQuestionIndex]
                    )}
                  </div>

                  <div className="p-5 lg:pt-2 py-5 lg:py-0 sticky bottom-0">
                    <Button
                      type="button"
                      color="secondary"
                      className="inline-flex items-center justify-center float-left"
                      disabled={CurrentQuestionIndex == 0}
                      // @ts-ignore
                      onClick={selectPrev}
                    >
                      <svg
                        className="-rotate-180 w-3.5 h-3.5 me-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                      Previous
                    </Button>
                    <Button
                      type="button"
                      color="secondary"
                      className="inline-flex items-center justify-center float-right"
                      disabled={
                        CurrentQuestionIndex ==
                        // @ts-ignore
                        questionSection.questions?.length - 1
                      }
                      // @ts-ignore
                      onClick={selectNext}
                    >
                      Next
                      <svg
                        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                    </Button>
                    {/* <button
                      className="rounded bg-[#ec4899] px-6 py-1 text-white float-left"
                      disabled={CurrentQuestionIndex == 0}
                      onClick={selectPrev}
                    >
                      Prev
                    </button>
                    <button
                      className="rounded bg-[#d946ef] px-6 py-1 text-white float-right"
                      disabled={
                        CurrentQuestionIndex ==
                        questionSection.questions.length - 1
                      }
                      onClick={selectNext}
                    >
                      Next
                    </button> */}
                  </div>
                </>
              )}
            </div>

            <div className="lg:basis-3/12 flex flex-col justify-between lg:max-h-[85vh] sticky top-16 space-y-5 lg:ml-4">
              <div>
                <div className="bg-slate-100 shadow rounded border border-slate-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">
                  <Timer timeInMinute={15} />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-y-5 my-3 h-48 overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 scrollbar-track-rounded-full scrollbar-thumb-rounded-full">
                  {
                    // @ts-ignore
                    [...questionSection.questions.keys()].map((ob) => {
                      return (
                        <NumberCircle
                          key={ob}
                          color={currentMode(ob)}
                          number={ob}
                          selectedIndexChange={selectedIndexChange}
                        ></NumberCircle>
                      );
                    })
                  }
                </div>
              </div>
              <div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-y-5 text-gray-900 dark:text-gray-400">
                  <div className="md:justify-center">
                    <NumberCircle color={1} />
                    <p className="text-center mt-1">Not visited</p>
                  </div>
                  <div className="md:justify-center">
                    <NumberCircle color={2} />
                    <p className="text-center mt-1">Visited</p>
                  </div>
                  <div className="md:justify-center">
                    <NumberCircle color={3} />
                    <p className="text-center mt-1">Correct</p>
                  </div>
                  <div className="md:justify-center">
                    <NumberCircle color={4} />
                    <p className="text-center mt-1">Wrong</p>
                  </div>
                </div>
                <div className="flex flex-col mt-8 space-y-2">
                  {/* <Button type="primary" size="md" onClick={() => {}}>
                    Next Section
                  </Button> */}
                  <Button
                    type="button"
                    disabled={
                      // score.status ||
                      // CurrentQuestionIndex !==
                      //   // @ts-ignore
                      //   questionSection.questions.length - 1 ||
                      selectedAnswer.length < questionSection.questions.length
                    }
                    // @ts-ignore
                    onClick={() => {
                      if (correctAns || !score.status) {
                        if (submitQuiz) {
                          setScore((prev) => ({ ...prev, status: true }));
                          setCorrectAns(false);
                        } else {
                          handleSubmit();
                        }
                      } else {
                        router.push("/");
                        setSubmitQuiz(false);
                      }
                    }}
                  >
                    {isLoading ? (
                      <Loader color="text-white" />
                    ) : correctAns ? (
                      "See Score"
                    ) : score.status ? (
                      "Exit Quiz"
                    ) : (
                      "Submit Quiz"
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
};

export default CourseQuiz;
