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
      <div style={divStyle} className="">
        <img
          src={secondStepper}
          className=" mx-auto mt-10 mb-10"
          alt=""
          style={{ width: "50%", height: "50px" }}
        />
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

            <NavLink to="/enterOTP">
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
