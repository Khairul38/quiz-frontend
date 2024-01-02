import React, { useState } from "react";
import OptionalAnswer from "../Answer/OptionalAnswer/OptionalAnswer";

// @ts-ignore
const OptionalQuestion = (props) => {
  const { selectedAnswer, setSelectedAnswer } = props;
  // const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [isModelOpen, SetModelOpen] = useState(false);

  // console.log(props, selectedAnswer);

  const openModel = () => {
    SetModelOpen(!isModelOpen);
  };

  // @ts-ignore
  const selected = (id) => {
    // @ts-ignore
    setSelectedAnswer((pre) => {
      const found = [...props.inside.quizAnswers].find((ob) => ob.id === id);
      if (
        found !== undefined &&
        // @ts-ignore
        pre.find((ob) => ob.id === id) === undefined
      ) {
        return [...pre, { ...found, questionId: props.inside.id }];
      }
      return pre;
    });
  };

  // @ts-ignore
  const unSelected = (id) => {
    // @ts-ignore
    setSelectedAnswer((pre) => {
      // @ts-ignore
      return pre.filter((ob) => ob.id !== id);
    });
  };

  // @ts-ignore
  const isDisable = (answer) => {
    const got =
      // @ts-ignore
      selectedAnswer.find((ob) => ob.id === answer.id) === undefined &&
      props.inside.allowedAnswerLimit === selectedAnswer.length;
    return got;
  };
  const questionSave = () => {
    props.questionSave(props.inside);
  };

  if (props.inside.quizAnswers.count === 0) return <div>Loading....</div>;
  return (
    <div className="flex flex-col">
      {!props.fromParagraph ? (
        <div className="top-16 p-4 bg-slate-100 shadow-lg rounded border border-slate-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">
          {props.inside.attachments && props.inside.attachments.length > 0 ? (
            <img
              src={props.inside.attachments[0]}
              className="rounded float-right w-56 h-32"
            ></img>
          ) : (
            <></>
          )}
          <p className="text-center font-semibold text-blue-600 dark:text-blue-500 mb-2">{`Question-> ${
            props.questionNumber + 1
          } / ${props.totalQuestion}`}</p>
          <p className="text-lg font-semibold">
            {props.inside.question}{" "}
            <span className="text-blue-600 dark:text-blue-500 text-base">
              {props.inside.multiChoice === true &&
                "(The answer can be multiple)"}
            </span>
          </p>
        </div>
      ) : (
        <div className="p-[10px] m-3 box-border shadow-[0px_3px_8px_rgba(0,0,0,0.24)] rounded">
          {props.inside.attachments && props.inside.attachments.length > 0 ? (
            <img
              src={props.inside.attachments[0]}
              className="rounded float-right w-56 h-32"
            ></img>
          ) : (
            <></>
          )}{" "}
          <p className="text-lg font-semibold ">
            <span>Question {props.questionNumber + 1}. </span>
            {props.inside.question}
          </p>{" "}
        </div>
      )}
      <div className="my-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-">
          {[...props.inside.quizAnswers].map((ob) => {
            return (
              <OptionalAnswer
                key={ob.id}
                answer={ob}
                selected={selected}
                unselected={unSelected}
                isDisabled={isDisable(ob)}
                selectedAnswer={selectedAnswer}
                correctAns={props.correctAns}
              ></OptionalAnswer>
            );
          })}
        </div>
      </div>
      {/* <div className="my-5">
        <button
          className="bg-[#10b981] p-[5px] w-[100px] float-right mr-8 rounded text-white"
          onClick={questionSave}
        >
          Save
        </button>
      </div> */}
    </div>
  );
};

export default OptionalQuestion;
