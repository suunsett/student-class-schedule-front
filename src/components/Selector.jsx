import React from "react";

function Selector(props) {
  const handleSelect = (option) => { // toggle function for multi-select behavior
    if (props.selectedValue.includes(option)) {
      props.onSelect(props.selectedValue.filter((item) => item !== option));
    } else {
      props.onSelect([...props.selectedValue, option]);
    }
  };  
  return (
    <div className="relative h-full flex flex-col">
      <div className="flex-1 overflow-y-auto px-4 mt-4 max-h-[330px]">
        <ul className="space-y-7">
          {props.options?.map((option, index) => (
            <li key={index} className="flex justify-between items-center">
              <label className="text-custom-blue">{option}</label>
              
              <span
                className="w-4 h-4 rounded-full border-2 border-custom-blue flex items-center justify-center cursor-pointer ml-1"
                onClick={() => handleSelect(option)}
              >
                {props.selectedValue.includes(option) && (
                  <span className="w-2 h-2 bg-custom-blue rounded-full"></span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="fixed bg-custom-white h-8 mt-90 mr-27">
        <button
          onClick={() => props.setPopup(false)}
          className="bg-custom-white shadow-sm w-[64px] h-[25px] shadow-custom-blue text-custom-blue text-base rounded"
        >
          تایید
        </button>
      </div>
    </div>
  );
}

export default Selector;
