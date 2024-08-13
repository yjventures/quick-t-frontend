import React from "react";
import howTransfer from "../../assets/images/howTransfer.png";
import greentick from "../../assets/images/green-tick.png";
import "./howTransfer.css";
function HowTransfer() {

  const TransferItems = ({ text }) => {
    return (
      <div className="flex gap-4 mt-2 ">
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
          {text}
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col md:flex-row my-20">
      {/* Left Part */}
      <div
        className="w-full md:w-1/2 flex items-center sm:items-start md:items-center xl:items-center lg:items-cneter justify-center px-2 "
      // style={{ height: "90vh", backgroundColor: "#FFFFFF" }}
      >
        <img
          src={howTransfer}
          alt="image"
          className="sm:w-[580px] sm:h-[570px] object-cover mb-10 sm:mb-0"
        />
      </div>

      {/* Right Part */}
      <div
        className="w-full md:w-1/2 flex items-center sm:items-start md:items-center xl:items-center lg:items-cneter justify-center container pl-5 "
      // style={{ height: "90vh", backgroundColor: "#FFFFFF" }}
      >
        <div className="flex flex-col gap-6 ">
          <p className="howTranferHeadingText">HOW TO TRANSFER</p>
          <p className="howTransferCountDown font-bold text-3xl sm:text-3xl md:text-5xl lg:text-5xl xl:text-5xl">
            Easy as 1 - 2 - 3
          </p>
          <p className="howTransferNormalText text-base sm:text-base md:text-2xl lg:text-2xl xl:text-2xl">
            Make an account and start transferring money in minutes.
          </p>
          <TransferItems text={'Select your preffered amount'} />
          <TransferItems text={'Wait for KYC approved (only for first time)'} />
          <TransferItems text={'Enter receriver details'} />
          <TransferItems text={'Give your card details'} />
          <TransferItems text={'Awesome your money is already sent!!'} />

        </div>
      </div>
    </div>
  );
}

export default HowTransfer;
