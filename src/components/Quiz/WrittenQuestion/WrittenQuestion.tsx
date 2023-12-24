import React, { useState } from "react";

const WrittenQuestion = (props: any) => {
  const [characterCount, setCharacterCount] = useState(0);
  const changeCharacterCount = (ev: any) => {
    var value = ev.target.value;
    setCharacterCount(value.length);
  };
  const questionSave = () => {
    // console.log('clicked')
    props.questionSave(props.inside);
  };
  return (
    <div>
      <div className="mb-4">
        <div className="mx-2 bg-[#312e81] text-white p-[5px] rounded">
          <p className="mb-4">
            <span>Question {props.questionNumber + 1}. </span>
            {props.inside.question}
          </p>
        </div>
      </div>

      <div className="px-12 text-right">
        <p style={{ margin: "0px" }}>Character Count:- {characterCount}</p>
      </div>

      <div className="h-full mx-[10px] p-[10px]">
        <textarea
          className="h-full border-[#e9e9e9] w-[99%] p-[10px] m-[10px] tracking-[0.05rem] shadow-[0px_2px_5px_0px_rgba(50,50,105,0.15),0px_1px_1px_0px_rgba(0,0,0,0.05)] focus:shadow-[0px_2px_5px_0px_#f0abfc,0px_1px_1px_0px_#f0abfc] focus:outline-none"
          // @ts-ignore
          rows="17"
          onChange={changeCharacterCount}
          placeholder="Type your answer.."
        ></textarea>
      </div>
      <div className="my-2 h-9">
        <button
          className="bg-[#10b981] p-[5px] w-[100px] float-right mr-8 rounded text-white"
          onClick={questionSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default WrittenQuestion;
