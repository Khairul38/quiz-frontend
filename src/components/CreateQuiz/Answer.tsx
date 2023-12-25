import React, { useState } from "react";
import { HiTrash } from "react-icons/hi";
import Textarea from "../common/Textarea";
import Input from "../common/Input";
import Checkbox from "../common/Checkbox";

const Answer = ({
  check,
  multipleChoiceQuestion,
  answer,
  aIndex,
  setQuestionData,
}: {
  check: any;
  multipleChoiceQuestion: any;
  answer: any;
  aIndex: any;
  setQuestionData: any;
}) => {
  const [hovering, setHovering] = useState(false);
  return (
    <div
      className="grid grid-cols-12 gap-2 items-center mb-3"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="col-span-10 space-y-1.5">
        <div className="flex items-center">
          <Checkbox
            className="mr-1"
            checked={answer.istrue}
            onChange={({ target }) => {
              if (target.checked) {
                setQuestionData({
                  //@ts-ignore
                  quizAnswers: multipleChoiceQuestion.quizAnswers.map(
                    //@ts-ignore
                    (a, i) => {
                      if (i === aIndex) return { ...a, istrue: target.checked };
                      else return { ...a };
                    }
                  ),
                });
              } else {
                setQuestionData({
                  //@ts-ignore
                  quizAnswers: multipleChoiceQuestion.quizAnswers.map(
                    //@ts-ignore
                    (a, i) => {
                      if (i === aIndex) return { ...a, istrue: target.checked };
                      else return { ...a };
                    }
                  ),
                });
              }
            }}
          />
          <div className="flex-1">
            <Input
              type="text"
              placeholder="Insert an option"
              defaultValue={answer?.answer}
              onChange={({ target }) =>
                setQuestionData({
                  //@ts-ignore
                  quizAnswers: multipleChoiceQuestion.quizAnswers.map(
                    //@ts-ignore
                    (a, i) => {
                      if (i === aIndex) return { ...a, answer: target.value };
                      else return { ...a };
                    }
                  ),
                })
              }
              // error={check(answer.answer)}
              // supportText={check(answer.answer) && "This field cannot be empty"}
            />
          </div>
        </div>
        <div className="ml-14">
          <Textarea
            type="text"
            placeholder="Explain why this is or isn't the best option."
            mandatory
            defaultValue={answer?.explanation}
            onChange={({ target }) =>
              setQuestionData({
                // @ts-ignore
                quizAnswers: multipleChoiceQuestion.quizAnswers.map((a, i) => {
                  if (i === aIndex) return { ...a, explanation: target.value };
                  else return { ...a };
                }),
              })
            }
            // error={check(answer.explanation)}
            // supportText={
            //   check(answer.explanation) && "This field cannot be empty"
            // }
          />
        </div>
      </div>
      {multipleChoiceQuestion.quizAnswers?.length > 1 && (
        <HiTrash
          className={[
            "text-white bg-red-500 p-1 rounded mx-2 cursor-pointer",
            !hovering && "hidden",
          ].join(" ")}
          size={24}
          onClick={() => {
            setQuestionData({
              quizAnswers: multipleChoiceQuestion.quizAnswers.filter(
                // @ts-ignore
                (a, i) => i !== aIndex
              ),
            });
          }}
        />
      )}
    </div>
  );
};

export default Answer;
