import React from "react";

function Select(props) {
  return (
    <>
      <div
        className="bg-custom-blue w-[257px] h-[44px] rounded-md border border-custom-white
       mx-auto mt-10 flex justify-between shadow-lg shadow-custom-blue "
      >
        <div className="flex">
          <label htmlFor="">
            <img src={props.icon} alt="icons" className="mr-3 mt-[5px]" />
          </label>
          <label
            htmlFor=""
            className="text-custom-white my-auto text-base mr-3"
          >
            {props.name}
          </label>
        </div>
        <button onClick={props.onClick} className="text-custom-white ml-4">
          <img
            src="/icons/arrow-down.svg"
            alt="arrow-down"
            className="w-6 h-6"
          />
        </button>
      </div>
    </>
  );
}
export default Select;
