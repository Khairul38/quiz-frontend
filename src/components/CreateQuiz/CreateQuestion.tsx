import React, { useState } from "react";
import Button from "../common/Button";
import { HiPlus } from "react-icons/hi";
import Answer from "./Answer";
import Textarea from "../common/Textarea";
import { check } from "@/utils/check";
import Select from "../common/Select";
import Input from "../common/Input";
import { useGetCategoriesQuery } from "@/redux/features/category/categoryApi";
import { useCreateQuizMutation } from "@/redux/features/quiz/quizApi";
import { IAuthState } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/reduxHooks";
import { notify } from "../common/Toastify";
import { useRouter } from "next/navigation";
import Loader from "../common/Loader";

const DEFAULT_QUESTION = {
  categoryId: null,
  multiChoice: null,
  mark: null,
  timeTaken: null,
  question: null,
  answers: [
    {
      answer: null,
      explanation: null,
      istrue: false,
    },
  ],
};
const categoryData = [
  { text: "Select Category", value: "" },
  { text: "React", value: "id" },
  { text: "HTML", value: "id" },
  { text: "CSS", value: "id" },
  { text: "Javascript", value: "Armenian" },
];

const CreateQuestion = ({ categoryOption }: { categoryOption: any }) => {
  const router = useRouter();
  const { user } = useAppSelector((state: { auth: IAuthState }) => state.auth);

  const [createQuiz, { isSuccess, isLoading }] = useCreateQuizMutation();

  const [multipleChoiceQuestion, setMultipleChoiceQuestion] =
    useState(DEFAULT_QUESTION);

  const setQuestionData = (newData: any) => {
    setMultipleChoiceQuestion((oldData) => ({ ...oldData, ...newData }));
  };

  console.log(multipleChoiceQuestion);

  const handleSubmitQuestion = () => {
    try {
      createQuiz({ ...multipleChoiceQuestion, creatorId: user?.id });
      if (isSuccess) {
        notify("success", "Quiz created successfully");
      }
      router.push("/");
    } catch (error) {}
  };
  return (
    <div className="dark:text-gray-300 bg-white border border-blue-200 rounded-lg dark:bg-gray-800 dark:border-blue-700 shadow-md shadow-blue-200 dark:shadow-blue-500 p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-end mb-5">
        <Select
          label="Category"
          type="language"
          mandatory
          options={[{ text: "Select Category", value: "" }, ...categoryOption]}
          // defaultValue={createCourseForm.data.language}
          onChange={({ target }) =>
            setQuestionData({ categoryId: target.value })
          }
        />
        <Select
          label="Multi Choice"
          type="language"
          mandatory
          options={[
            { text: "Select Multi Choice", value: "" },
            { text: "True", value: "true" },
            { text: "False", value: "false" },
          ]}
          // defaultValue={createCourseForm.data.language}
          onChange={({ target }) =>
            setQuestionData({ multiChoice: target.value })
          }
        />

        <Input
          type="number"
          label="Question Mark"
          placeholder="Insert your question mark."
          mandatory
          // defaultValue={createCourseForm.data.scheduleInfo.courseDuration}
          onChange={({ target }) => setQuestionData({ mark: target.value })}
          error={check(multipleChoiceQuestion.mark)}
          supportText={
            check(multipleChoiceQuestion.mark) && "This field cannot be empty"
          }
        />
        <Input
          type="number"
          label="Question Time"
          placeholder="Insert your question time."
          mandatory
          // defaultValue={createCourseForm.data.scheduleInfo.courseDuration}
          onChange={({ target }) =>
            setQuestionData({ timeTaken: target.value })
          }
          error={check(multipleChoiceQuestion.timeTaken)}
          supportText={
            check(multipleChoiceQuestion.timeTaken) &&
            "This field cannot be empty"
          }
        />
      </div>
      <Textarea
        type="text"
        label="Question"
        placeholder="Insert your question"
        mandatory
        // defaultValue={multipleChoiceQuestion.question}
        onChange={({ target }) => setQuestionData({ question: target.value })}
        error={check(multipleChoiceQuestion.question)}
        supportText={
          check(multipleChoiceQuestion.question) && "This field cannot be empty"
        }
      />

      <div>
        <label className="block text-sm font-medium mt-5 mb-1">
          Answers<span className="text-rose-500 ml-1">*</span>
        </label>
        {multipleChoiceQuestion.answers.map((answer, aIndex) => (
          <Answer
            key={aIndex}
            check={check}
            multipleChoiceQuestion={multipleChoiceQuestion}
            answer={answer}
            aIndex={aIndex}
            setQuestionData={setQuestionData}
          />
        ))}
        <Button
          color="secondary"
          className="flex items-center gap-2 mt-5"
          onClick={() => {
            setQuestionData({
              answers: [
                ...multipleChoiceQuestion.answers,
                {
                  answer: null,
                  explanation: null,
                  istrue: false,
                },
              ],
            });
          }}
        >
          <HiPlus />
          Add more answer
        </Button>
      </div>

      <div className="flex justify-end mt-4 space-x-2">
        <Button
          // onClick={() => {
          //   setAddMultipleChoice(false);
          //   setAddContentSection(true);
          // }}
          // danger
          type="button"
          color="danger"
        >
          Cancel
        </Button>
        {/* <Button
            type="button"
            // onClick={() => setBulkAdding(true)}
          >
            Add Bulk Questions
          </Button> */}
        <Button
          disabled={
            multipleChoiceQuestion.question === null ||
            multipleChoiceQuestion.answers[0].answer === null ||
            multipleChoiceQuestion.answers[0].explanation === null ||
            check(multipleChoiceQuestion.question) ||
            check(multipleChoiceQuestion.answers[0].answer) ||
            check(multipleChoiceQuestion.answers[0].explanation)
          }
          // loading={loadingBtn}
          onClick={() => {
            handleSubmitQuestion();
          }}
          type="button"
        >
          {isLoading ? <Loader /> : "Add Question"}
        </Button>
      </div>
    </div>
  );
};

export default CreateQuestion;
