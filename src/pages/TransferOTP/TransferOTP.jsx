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
        <div className="w-5/6 flex flex-col mt-5 mb-5">
          <ol className="progressBar flex items-center w-full justify-center text-center xl:ps-40 md:ps-40 ps-10">
            <li className="flex w-full items-center text-orange-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-orange-400">
              <span className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-orange-500 shrink-0">
                <svg width="35" height="35" xmlns="http://www.w3.org/2000/svg">
                  <text
                    x="50%"
                    y="50%"
                    fill="white"
                    fontSize="16"
                    textAnchor="middle"
                    alignmentBaseline="central"
                  >
                    1
                  </text>
                </svg>
              </span>
            </li>
            <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-orange-500">
              <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-orange-500 shrink-0">
                <svg width="35" height="35" xmlns="http://www.w3.org/2000/svg">
                  <text
                    x="50%"
                    y="50%"
                    fill="white"
                    fontSize="16"
                    textAnchor="middle"
                    alignmentBaseline="central"
                  >
                    2
                  </text>
                </svg>
              </span>
            </li>
            <li className="flex items-center w-full">
              <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-orange-500 shrink-0">
                <svg width="35" height="35" xmlns="http://www.w3.org/2000/svg">
                  <text
                    x="50%"
                    y="50%"
                    fill="white"
                    fontSize="16"
                    textAnchor="middle"
                    alignmentBaseline="central"
                  >
                    3
                  </text>
                </svg>
              </span>
            </li>
          </ol>

          <ol className="mt-2 progressBar flex items-center w-full justify-center text-center xl:ps-40 md:ps-40 ps-10">
            <li className="flex w-full items-center after:content-[''] after:w-full after:inline-block text-xs ">
              <span className="text-orange-500"> Receiver Info</span>
            </li>
            <li className="flex w-full items-center after:content-[''] after:w-full after:inline-block text-xs">
              <span className="text-orange-500">Review</span>
            </li>
            <li className="flex items-center w-full text-xs">
              <span className="text-orange-500">Payment</span>
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
            <button
              className="flex justify-center items-center w-2/3 pt-2 pb-2 ps-5 pe-5 rounded-xl text-white mt-5 mx-auto"
              style={{ backgroundColor: "#043BA0" }}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TransferOTP;
