import React from "react";
import howTransfer from "../../assets/images/howTransfer.png";
import greentick from "../../assets/images/green-tick.png";
import "./howTransfer.css";
function HowTransfer() {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Left Part */}
      {/* hidden sm:flex md:flex lg:flex xl:flex here add for the hide image in the small device */}
      <div
        className="w-full md:w-1/2 flex items-center sm:items-start md:items-center xl:items-center lg:items-cneter justify-center px-2 "
        style={{ height: "90vh", backgroundColor: "#FFFFFF" }}
      >
        <div>
          <img src={howTransfer} width={580} height={570} alt="" />
        </div>
      </div>

      {/* Right Part */}
      <div
        className="w-full md:w-1/2 flex items-center sm:items-start md:items-center xl:items-center lg:items-cneter justify-center container pl-5"
        style={{ height: "90vh", backgroundColor: "#FFFFFF" }}
      >
        <div>
          <p className="howTranferHeadingText">HOW TO TRANSFER</p>
          <p className="howTransferCountDown font-bold text-3xl sm:text-3xl md:text-5xl lg:text-5xl xl:text-5xl">
            Easy as 1 - 2 - 3
          </p>
          <p className="howTransferNormalText text-base sm:text-base md:text-2xl lg:text-2xl xl:text-2xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing <br /> elit.
            Suspendisse sodales interdum sapien non pretium.
          </p>
          <p className="flex gap-4 mt-2">
            <img
              src={greentick}
              alt=""
              style={{
                height: "20px",
                width: "20px",
                borderRadius: "10px",
                marginTop: "3px",
              }}
            />
            <p className="howTransferSubText">
              Lorem ipsum dolor sit amet, consectetur.
            </p>
          </p>
          <p className="flex gap-4 mt-2 ">
            <img
              src={greentick}
              alt=""
              style={{
                height: "20px",
                width: "20px",
                borderRadius: "10px",
                marginTop: "3px",
              }}
            />
            <p className="howTransferSubText text-sm sm:text-sm md:text-lg lg:text-lg xl:text-lg">
              Lorem ipsum dolor sit amet, consectetur.
            </p>
          </p>
          <p className="flex gap-4 mt-2">
            <img
              src={greentick}
              style={{
                height: "20px",
                width: "20px",
                borderRadius: "10px",
                marginTop: "3px",
              }}
              alt=""
            />
            <p className="howTransferSubText text-sm sm:text-sm md:text-lg lg:text-lg xl:text-lg">
              Lorem ipsum dolor sit amet, consectetur.
            </p>
          </p>
          <p className="flex gap-4 mt-2">
            <img
              src={greentick}
              style={{
                height: "20px",
                width: "20px",
                borderRadius: "10px",
                marginTop: "3px",
              }}
              alt=""
            />
            <p className="howTransferSubText text-sm sm:text-sm md:text-lg lg:text-lg xl:text-lg">
              Lorem ipsum dolor sit amet, consectetur.
            </p>
          </p>
        </div>
      </div>
    </div>
  );
}

export default HowTransfer;
