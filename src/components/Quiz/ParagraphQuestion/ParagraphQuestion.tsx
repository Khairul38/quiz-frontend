import React from "react";
import OptionalQuestion from "../OptionalQuestion/OptionalQuestion";

const ParagraphQuestion = (props: any) => {
  // console.log(props)
  return (
    <div className="">
      <div className="top-16">
        <div className="mb-4 mx-2 bg-[#312e81] text-white rounded">
          {props.inside.attachments && props.inside.attachments.length > 0 ? (
            <img
              src={props.inside.attachments[0]}
              className="rounded float-right"
            ></img>
          ) : (
            <></>
          )}
          <p className="text-sm p-2">
            <span>Question {props.questionNumber + 1}. </span>
            {props.inside.question}
          </p>
        </div>
      </div>
      <div className="flex flex-col">
        {[...props.inside.pagraGraphOptionalQuestions].map((ob, index) => {
          return (
            <>
              <OptionalQuestion
                inside={ob}
                fromParagraph={true}
                questionNumber={index}
                key={ob.id}
              ></OptionalQuestion>
              <hr className="my-1 "></hr>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ParagraphQuestion;
