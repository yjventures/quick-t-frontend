import React, { useState } from "react";
import Rectangle from "../../assets/images/Rectangle.png";

import Headers from "../../components/Headers";
import secondStepper from "../../assets/images/secondStepper.png";
import { NavLink } from "react-router-dom";
function SendingMoneyInfo() {
  const divStyle = {
    backgroundImage: `url(${Rectangle})`,
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    minHeight: "100vh",
    paddingTop: "100px",
  };

  const receiverDataInfo = JSON.parse(localStorage.getItem("receiverData"));
  const amountDataInfo = JSON.parse(localStorage.getItem("amountData"));

  console.log(receiverDataInfo);
  console.log(amountDataInfo);
  const fullName = receiverDataInfo.firstName + " " + receiverDataInfo.lastName;
  const address = receiverDataInfo.city + ", " + receiverDataInfo.country;
  console.log(address);

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
            <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-orange-200">
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
              <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-orange-300 shrink-0">
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
            <li className="flex items-center w-full text-xs">Payment</li>
          </ol>
        </div>
        <div className="card">
          <form className="form">
            <p className="text-center font-bold text-2xl py-5">
              Review Details of your Transfer
            </p>

            <div>
              <p className="font-bold pb-5">Transfer Details</p>
              <div className="flex justify-between">
                <div>
                  <p className="font-normal text-sm pb-1">Transfer amount</p>
                  <p className="font-normal text-sm pb-1">Transfer fee</p>
                  <p className="font-normal text-sm pb-1">Toal Receiver gets</p>
                </div>
                <div>
                  <p className="font-bold font-bold pb-1">
                    {amountDataInfo.defaultAmount} AED
                  </p>
                  <p className="font-normal text-sm pb-1">
                    {amountDataInfo.transferFee} AUD
                  </p>
                  <p className="font-bold font-bold pb-1">230 AUD</p>
                </div>
              </div>
            </div>

            <div className="pt-10">
              <p className="font-bold pb-5">Receiver Details</p>
              <div className="flex justify-between">
                <div>
                  <p className="font-normal text-sm pb-1">Name</p>
                  <p className="font-normal text-sm pb-1">Phone Number</p>
                  <p className="font-normal text-sm pb-1">Address</p>
                </div>
                <div>
                  <p className="font-normal text-sm pb-1">{fullName}</p>
                  <p className="font-normal text-sm pb-1">01728704205</p>
                  <p className="font-normal text-sm pb-1">{address}</p>
                </div>
              </div>
            </div>

            <div className="pt-10">
              <p className="font-bold pb-5">Recipient Details</p>
              <div className="flex justify-between">
                <div>
                  <p className="font-normal text-sm pb-1">Name</p>
                  <p className="font-normal text-sm pb-1">Phone Number</p>
                  <p className="font-normal text-sm pb-1">Address</p>
                </div>
                <div>
                  <p className="font-normal text-sm pb-1">Rafiqur Rahman</p>
                  <p className="font-normal text-sm pb-1">01728704205</p>
                  <p className="font-normal text-sm pb-1">Sydney, Australia</p>
                </div>
              </div>
            </div>

            <NavLink to="/sendOTP">
              <button
                className="w-full pt-2 pb-2 ps-5 pe-5 rounded-xl text-white mt-5"
                style={{ backgroundColor: "#043BA0" }}
              >
                Send
              </button>
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SendingMoneyInfo;
