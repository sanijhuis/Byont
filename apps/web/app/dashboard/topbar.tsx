import React from "react";
import { AiTwotoneSetting } from "react-icons/ai";
function TopBar() {
  return (
    <>
      <div className="flex justify-between mt-5 text-white">
        <div>logged in user</div>
        <div className="items-center flex mb-1">
          <button className="text-center shadow-xl bg-lime-500 rounded-lg mr-2 p-2">
            sync github
          </button>
          <button>
            <AiTwotoneSetting className="text-4xl" />
          </button>
        </div>
      </div>
      <hr></hr>
    </>
  );
}

export default TopBar;
