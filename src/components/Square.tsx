import React from "react";

export default function Square(props: any) {
  return (
    <button
      className={`${props.value === 'X' ? 'text-red-500': 'text-green-500'} border m-1 border-gray-500 float-left font-bold h-44 w-44 text-center text-9xl focus:outline-none`}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
