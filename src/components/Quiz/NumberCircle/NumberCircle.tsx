import React from "react";

const NumberCircle = (props: any) => {
  // var color = Math.floor(Math.random() * 3);
  var colors = [
    "bg-blue-200",
    "bg-blue-400",
    "bg-emerald-500",
    "bg-red-500/90",
  ];
  // console.log(props.color);
  const selectedIndexChange = () => {
    if (props.selectedIndexChange != undefined)
      props.selectedIndexChange(props.number);
  };
  return (
    <div
      className={`flex w-12 h-12 rounded-full m-auto cursor-pointer ${
        colors[props.color - 1]
      }`}
      // style={{ backgroundColor: colors[props.color - 1] }}
      onClick={selectedIndexChange}
    >
      <button className="mx-auto font-sans text-xl text-white">
        {props.number != undefined ? props.number + 1 : ""}
      </button>
    </div>
  );
};

export default NumberCircle;
