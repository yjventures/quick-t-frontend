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
            <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-orange-200">
              <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                <svg
                  className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 16"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
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
              <button className="w-full pt-2 pb-2 ps-5 pe-5 rounded-xl text-white bg-blue-600 mt-5">
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
