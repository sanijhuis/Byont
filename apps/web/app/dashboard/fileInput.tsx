import React from "react";

export default function FileInput() {
  return (
    <div className="flex justify-center mb-20 mt-2 ">
      <div className="flex flex-col p-10 shadow-2xl items-center">
        <h1 className="text-white">file input</h1>
        <input
          type="file"
          className="file:bg-gray-700 file:rounded-md file:hover:cursor-pointer file:text-gray-400 file:border-none p-3 block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer  bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          accept=".sol"
        ></input>
        <div>
        </div>
      </div>
    </div>
  );
}
