import React, { useState } from "react";
import Rectangle from "../../assets/images/Rectangle.png";
import paymentcheck from "../../assets/images/payment-check.png";
import Headers from "../../components/Headers";
import secondStepper from "../../assets/images/secondStepper.png";
import ReactCodeInput from "react-code-input";

import securityTick from "../../assets/images/securityTick.png";
function TransferOTP() {
  const divStyle = {
    backgroundImage: `url(${Rectangle})`,
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    minHeight: "100vh",
    paddingTop: "100px",
  };
  let defaultInputStyle = {
    fontFamily: "monospace",
    MozAppearance: "textfield",
    margin: "4px",
    paddingLeft: "8px",
    width: "45px",
    borderRadius: "3px",
    height: "45px",
    fontSize: "32px",
    border: "1px solid lightskyblue",
    boxSizing: "border-box",
    color: "black",
    backgroundColor: "white",
    borderColor: "lightgrey",
    textAlign: "center",
  };

  return (
    <div>
      <Headers />
      <div
        style={divStyle}
        className="flex flex-col justify-cneter items-center"
      >
        <div className="w-3/6 flex mt-5 mb-5">
          <ol className="progressBar flex items-center w-full justify-center text-center xl:ps-30 md:ps-32">
            <li className="flex w-full items-center text-orange-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-orange-400">
              <span className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-orange-400 shrink-0">
                <svg
                  className="w-3.5 h-3.5 text-blue-600 lg:w-4 lg:h-4 dark:text-gray-100"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
              </span>
            </li>
            <li className="flex w-full items-center text-orange-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-orange-400">
              <span className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-orange-400 shrink-0">
                <svg
                  className="w-3.5 h-3.5 text-blue-600 lg:w-4 lg:h-4 dark:text-gray-100"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 16 12"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 5.917 5.724 10.5 15 1.5"
                  />
                </svg>
              </span>
            </li>
            <li className="flex items-center w-full">
              <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                <svg
                  className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
                </svg>
              </span>
            </li>
          </ol>
        </div>
        <div className="card">
          <form className="form pt-10">
            <div className="mx-auto pb-5">
              <img src={paymentcheck} alt="" />
            </div>
            <p className="text-center">Enter the OTP to complete transfer</p>
            <div className="flex gap-10 justify-center mt-5">
              <ReactCodeInput
                type="number"
                inputStyle={defaultInputStyle}
                fields={4}
              />

              <img src={securityTick} alt="" />
            </div>
            <button className="w-full pt-2 pb-2 ps-5 pe-5 rounded-xl text-white bg-blue-600 mt-5">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TransferOTP;
