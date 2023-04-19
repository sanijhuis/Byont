"use client";

import { useState } from "react";

interface ButtonActivateProps {
  onClick: () => void;
}

const ButtonActivate = ({ onClick }: ButtonActivateProps) => {
  const [active, setActive] = useState(false);
  return (
    <div>
      {!active && (
        <button
          className="rounded-md bg-white px-1 py-[5px] font-medium text-black hover:opacity-80 hover:transition-opacity"
          onClick={() => setActive(true)}
        >
          Activate
        </button>
      )}
      {active && (
        <div className="flex flex-row">
          <p className="my-auto mr-2 text-10 text-white/40">Are you sure?</p>
          <div className="flex flex-row gap-1">
            <button
              className="rounded-md bg-green px-1 py-[5px] font-medium text-black hover:opacity-80 hover:transition-opacity"
              onClick={onClick}
            >
              Yes
            </button>
            <button
              className="rounded-md bg-white px-1 py-[5px] font-medium text-black hover:opacity-80 hover:transition-opacity"
              onClick={() => setActive(false)}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ButtonActivate;
