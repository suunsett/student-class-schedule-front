import React from "react";

 function Splash({ fadeOut }) {
   return (
    <div className={`h-screen flex items-center justify-center text-4xl font-bold transition-opacity duration-700 ${
      fadeOut ? "opacity-0" : "opacity-100"
    }`}>
      <div className="bg-bg-color w-full h-screen">
        <div className="absolute">
          <img
            src="/icons/Vector 12.svg"
            alt=""
            className="h-[115.18px] w-[132.75px] opacity-5 relative top-2"
          />
          <img
            src="/icons/Vector 9.svg"
            alt=""
            className="h-[115.18px] w-[132.75px] opacity-5 relative right-60 top-20 "
          />
          <img
            src="/icons/Vector 10.svg"
            alt=""
            className="h-[115.18px] w-[132.75px] opacity-5 relative top-100 right-15"
          />
          <img
            src="/icons/Vector 11.svg"
            alt=""
            className="h-[115.18px] w-[132.75px] opacity-5 relative top-115 right-70"
          />
        </div>
        <div
          className="flex
        flex-col
        justify-center
        items-center
        h-screen"
        >
          <img
            src="/icons/class-yar.svg"
            alt="class-yar icon"
            className="h-[115.18px] w-[132.75px]"
          />
          <h2 className="text-custom-blue text-3xl font-bold">کلاس یار</h2>
        </div>
      </div>
    </div>
  );
}
export default Splash;
