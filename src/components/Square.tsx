import React from "react";

export default function Square(props: any) {
  return (
    <button
      className="border border-gray-500 float-left font-bold h-16 w-16 text-center text-xl p-0 focus:outline-none"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
