import React from "react";
import "./sendFrom.css";
import sendFrom from "../../assets/images/sendFrom.png";
function SendFrom() {
  return (
    <div className="">
      <div className="flex flex-col md:flex-row mb-10">
        {/* Left Part */}
        <div
          className="w-full md:w-1/2 flex items-center sm:items-start md:items-center xl:items-center lg:items-cneter justify-center px-5"
        // style={{ height: "90vh" }}
        >
          <div>
            <p className="sendFromHeadingText text-4xl md:text-5xl lg:text-5xl xl:text-5xl">
              Send from anywhere <br /> in the world
            </p>
            <p className="sendFromNormalText lg:text-2xl xl:text-2xl md:text-2xl text-lg pt-10">
              Investing on Paytm Money is transparent, low-cost <br /> and
              commission-free. Buy stocks & mutual funds that <br /> can help
              you create wealth & realise your dreams.
            </p>
          </div>
        </div>

        {/* Right Part */}
        {/* hidden sm:flex md:flex lg:flex xl:flex here add for the hide image in the small device */}
        <div
          className="w-full md:w-1/2 flex items-center sm:items-start md:items-center xl:items-center lg:items-cneter justify-center container px-2 "
        // style={{ height: "90vh" }}
        >
          <div>
            <img
              src={sendFrom}
              alt="image"
              className="sm:w-[580px] sm:h-[570px] object-cover mt-10 sm:mb-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendFrom;
