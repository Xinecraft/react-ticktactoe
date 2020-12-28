import React from "react";

export default function Square(props: any) {
  return (
    <button
      className={`${props.value === 'X' ? 'text-red-500': 'text-green-500'} m-1 border-4 border-blue-200 bg-blue-100 float-left font-bold h-20 w-20 text-3xl md:h-32 md:w-32 md:text-7xl lg:h-44 lg:w-44 lg:text-9xl text-center focus:outline-none`}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}
