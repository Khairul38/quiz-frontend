import React, { useEffect, useState } from "react";
import Button from "../common/Button";
import { HiPlus } from "react-icons/hi";
import Answer from "./Answer";
import Textarea from "../common/Textarea";
import { check } from "@/utils/check";
import Select from "../common/Select";
import Input from "../common/Input";
import {
  useCreateQuizMutation,
  useUpdateQuizMutation,
} from "@/redux/features/quiz/quizApi";
import { IAuthState } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/reduxHooks";
import { notify } from "../common/Toastify";
import { useRouter } from "next/navigation";
import Loader from "../common/Loader";

const DEFAULT_QUESTION = {
  categoryId: "",
  multiChoice: "",
  mark: "",
  timeTaken: "",
  question: "",
  quizAnswers: [
    {
      answer: "",
      explanation: "",
      istrue: false,
    },
  ],
};

const CreateQuestion = ({
  categoryOption,
  quizData,
}: {
  categoryOption?: any;
  quizData?: any;
}) => {
  const router = useRouter();
  const { user } = useAppSelector((state: { auth: IAuthState }) => state.auth);

  const [createQuiz, { isSuccess, isLoading, error }] = useCreateQuizMutation();

  const [updateQuiz, { isSuccess: us, isLoading: ul, error: ue }] =
    useUpdateQuizMutation();

  const [multipleChoiceQuestion, setMultipleChoiceQuestion] = useState(
    quizData ? quizData : DEFAULT_QUESTION
  );

  const setQuestionData = (newData: any) => {
    setMultipleChoiceQuestion((oldData: any) => ({ ...oldData, ...newData }));
  };

  // console.log(quizData, multipleChoiceQuestion);

  const handleSubmitQuestion = () => {
    try {
      if (quizData) {
        updateQuiz({
          id: multipleChoiceQuestion.id,
          data: { ...multipleChoiceQuestion, creatorId: user?.id },
        });
      } else {
        createQuiz({ ...multipleChoiceQuestion, creatorId: user?.id });
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (error) {
      notify("error", (error as any)?.data?.message);
    }
    if (ue) {
      notify("error", (ue as any)?.data?.message);
    }
    if (isSuccess) {
      notify("success", "Quiz created successfully");
      setQuestionData(DEFAULT_QUESTION);
      // router.push("/manage-quiz");
    }
    if (us) {
      notify("success", "Quiz update successfully");
      router.push("/manage-quiz");
    }
  }, [isSuccess, error, us]);

  return (
    <div className="dark:text-gray-300 bg-white border border-blue-200 rounded-lg dark:bg-gray-800 dark:border-blue-700 shadow-md shadow-blue-200 dark:shadow-blue-500 p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-end mb-5">
        <Select
          placeholder="Select Category"
          defaultBlank
          label="Category"
          type="language"
          mandatory
          options={categoryOption}
          value={multipleChoiceQuestion.categoryId}
          onChange={({ target }) =>
            setQuestionData({ categoryId: target.value })
          }
        />
        <Select
          label="Allow Multiple Answer"
          placeholder="Choose"
          defaultBlank
          mandatory
          options={[
            { text: "Yes", value: true },
            { text: "No", value: false },
          ]}
          value={multipleChoiceQuestion.multiChoice}
          onChange={({ target }) =>
            setQuestionData({
              multiChoice: target.value === "true" ? true : false,
            })
          }
        />

        <Input
          type="number"
          label="Question Mark"
          placeholder="Insert your question mark."
          mandatory
          value={multipleChoiceQuestion.mark}
          onChange={({ target }) =>
            setQuestionData({ mark: Number(target.value) })
          }
          // error={check(multipleChoiceQuestion.mark)}
          // supportText={
          //   check(multipleChoiceQuestion.mark) && "This field cannot be empty"
          // }
        />
        <Input
          type="number"
          label="Question Time"
          placeholder="Insert your question time in minute."
          mandatory
          value={multipleChoiceQuestion.timeTaken}
          onChange={({ target }) =>
            setQuestionData({ timeTaken: Number(target.value) })
          }
          // error={check(multipleChoiceQuestion.timeTaken)}
          // supportText={
          //   check(multipleChoiceQuestion.timeTaken) &&
          //   "This field cannot be empty"
          // }
        />
      </div>
      <Textarea
        type="text"
        label="Question"
        placeholder="Insert your question"
        mandatory
        value={multipleChoiceQuestion.question}
        onChange={({ target }) => setQuestionData({ question: target.value })}
        // error={check(multipleChoiceQuestion.question)}
        // supportText={
        //   check(multipleChoiceQuestion.question) && "This field cannot be empty"
        // }
      />

      <div>
        <label className="block text-sm font-medium mt-5 mb-1">
          Options<span className="text-rose-500 ml-1">*</span>
        </label>
        {multipleChoiceQuestion.quizAnswers.map(
          (answer: any, aIndex: number) => (
            <Answer
              key={aIndex}
              check={check}
              multipleChoiceQuestion={multipleChoiceQuestion}
              answer={answer}
              aIndex={aIndex}
              setQuestionData={setQuestionData}
            />
          )
        )}
        <Button
          color="secondary"
          className="flex items-center gap-2 mt-5"
          onClick={() => {
            setQuestionData({
              quizAnswers: [
                ...multipleChoiceQuestion.quizAnswers,
                {
                  answer: "",
                  explanation: "",
                  istrue: false,
                },
              ],
            });
          }}
        >
          <HiPlus />
          Add more option
        </Button>
      </div>

      <div className="flex justify-end mt-4 space-x-2">
        <Button
          onClick={() => {
            router.push("/manage-quiz");
            setMultipleChoiceQuestion(DEFAULT_QUESTION);
          }}
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
            check(multipleChoiceQuestion.timeTaken) ||
            check(multipleChoiceQuestion.mark) ||
            check(multipleChoiceQuestion.multiChoice) ||
            check(multipleChoiceQuestion.categoryId) ||
            check(multipleChoiceQuestion.question) ||
            check(multipleChoiceQuestion.quizAnswers[0].answer)
            // || check(multipleChoiceQuestion.quizAnswers[0].explanation)
          }
          // loading={loadingBtn}
          onClick={() => {
            handleSubmitQuestion();
          }}
          type="button"
        >
          {isLoading || ul ? (
            <Loader className="px-[29px]" color="text-white" />
          ) : (
            `${quizData ? "Update Quiz" : "Add Question"}`
          )}
        </Button>
      </div>
    </div>
  );
};

export default CreateQuestion;
