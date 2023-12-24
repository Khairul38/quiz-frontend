import React, { useRef } from "react";

// @ts-ignore
const OptionalAnswer = (props) => {
  const inputRef = useRef(null);
  // console.log(props);
  // @ts-ignore
  const selected = (ev) => {
    if (ev.target.checked) {
      props.selected(props.answer.id);
    } else {
      props.unselected(props.answer.id);
    }
  };
  // console.log(props.answer.attachments)
  return (
    <>
      {props.answer.attachments ? (
        <div className="flex justify-center">
          <div
            className={`w-60 rounded ${
              props.correctAns
                ? props.answer.istrue
                  ? "bg-emerald-500"
                  : props.selectedAnswer.find(
                      // @ts-ignore
                      (ans) => ans.id === props.answer.id
                    )
                  ? "bg-red-500/90"
                  : "bg-slate-100"
                : "bg-slate-100"
            } max-w-sm py-[6px] px-3 border border-slate-200`}
          >
            <img
              className="rounded-t w-56 h-36"
              src={props.answer.attachments[0]}
            />
            <div>
              <div className="py-2">
                <input
                  className="rounded cursor-pointer"
                  type="checkbox"
                  defaultChecked={props.selectedAnswer.find(
                    // @ts-ignore
                    (ans) => ans.id === props.answer.id
                  )}
                  disabled={props.correctAns}
                  // disabled={props.isDisabled}
                  onClick={selected}
                />
                <p className="inline text-base pl-4">{props.answer.answer}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          // @ts-ignore
          onClick={() => inputRef.current.click()}
          className={`${
            props.correctAns
              ? props.answer.istrue
                ? "bg-emerald-500 border-emerald-500"
                : props.selectedAnswer.find(
                    // @ts-ignore
                    (ans) => ans.id === props.answer.id
                  )
                ? "bg-red-500/90 border-red-500/90"
                : "bg-slate-100 border-slate-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
              : "bg-slate-100 border-slate-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
          } p-3 shadow rounded border cursor-pointer`}
        >
          <input
            // @ts-ignore
            onClick={() => inputRef.current.click()}
            className="h-4 w-4 border border-slate-400 rounded text-blue-500 focus:ring-transparent dark:focus:ring-transparent cursor-pointer"
            type="checkbox"
            defaultChecked={props.selectedAnswer.find(
              // @ts-ignore
              (ans) => ans.id === props.answer.id
            )}
            disabled={props.correctAns}
            // disabled={props.isDisabled}
            onChange={selected}
            ref={inputRef}
          />
          <p className="inline text-base pl-4">{props.answer.answer}</p>
        </div>
      )}
    </>
  );
};

export default OptionalAnswer;
