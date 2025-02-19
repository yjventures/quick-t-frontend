import React, { useState } from "react";
import Rectangle from "../../assets/images/Rectangle.png";

import Headers from "../../components/Headers";
import secondStepper from "../../assets/images/secondStepper.png";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { showFailedAlert } from "../../utils/Tooast.Utils";



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

  // const fetchIUserData = async () => {
  //   const user_id = localStorage.getItem("user_id");
  //   const response = await fetch(`https://api.quickt.com.au/api/kycs?filters[user][id][$eq]=${user_id}&fields[0]=city&fields[1]=country&fields[2]=street_address`, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${localStorage.getItem("jwt")}`,
  //     },
  //   });
  //   const res = await response.json();
  //   // console.log(res.data);
  //   return res.data;
  // }
  // const { isPending, error, data: userData } = useQuery({
  //   queryKey: 'userData',
  //   queryFn: fetchIUserData,
  // })
  // if (error) showFailedAlert('Something went wrong, please try again later');
  // console.log(userData)
  const userFullName = localStorage.getItem("first_name") + " " + localStorage.getItem("last_name");
  const userPhone = localStorage.getItem("phone");
  const fullName = receiverDataInfo.middle_name ? receiverDataInfo.first_name + " " + receiverDataInfo.middle_name + " " + receiverDataInfo.last_name : receiverDataInfo.first_name + " " + receiverDataInfo.last_name;
  const phone = receiverDataInfo.phone;
  const address = receiverDataInfo.city + ", " + receiverDataInfo.country;
  // console.log(address);
  // const transection_password = receiverDataInfo.transection_password
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

            {/* sender */}
            <div>
              <p className="font-bold pb-2">Sender Details</p>
              <div className="flex justify-between">
                <div>
                  <p className="font-normal text-sm pb-1">Name</p>
                  <p className="font-normal text-sm pb-1">Phone Number</p>
                  {/* <p className="font-normal text-sm pb-1">Address</p> */}
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p className="font-normal text-sm pb-1">{userFullName}</p>
                  <p className="font-normal text-sm pb-1">+{userPhone}</p>
                  {/* <p className="font-normal text-sm pb-1">{userData && userData[0]?.attributes?.street_address + ", " + userData[0]?.attributes?.city + ", " + userData[0]?.attributes?.country}</p> */}
                </div>
              </div>
            </div>

            {/* receiver */}
            <div className="pt-8">
              <p className="font-bold pb-2">Receiver Details</p>
              <div className="flex justify-between">
                <div>
                  <p className="font-normal text-sm pb-1">Name</p>
                  <p className="font-normal text-sm pb-1">Phone Number</p>
                  <p className="font-normal text-sm pb-1">Address</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p className="font-normal text-sm pb-1">{fullName}</p>
                  <p className="font-normal text-sm pb-1">+{phone}</p>
                  <p className="font-normal text-sm pb-1">{address}</p>
                </div>
              </div>
            </div>

            {/* details */}
            <div className="pt-8">
              <p className="font-bold pb-2">Transfer Details</p>
              <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                  <p className="font-normal text-sm pb-1">Your Transfer Amount</p>
                  <p className="font-normal text-sm pb-1">Charges & Fees</p>
                  <p className="font-normal text-sm pb-1">Your receiver receives</p>
                  {/* <p className="font-normal text-sm p2-1">Transaction password</p> */}
                </div>
                <div style={{ textAlign: 'right' }} className="flex flex-col gap-0">
                  <p className="font-bold pb-1">
                    {(amountDataInfo.givenAmount * amountDataInfo.currencyRateWithBuffer).toFixed(2)} AUD
                  </p>
                  <p className="font-normal text-sm pb-1">
                    {((amountDataInfo.transferFee + amountDataInfo.gatewayFee + amountDataInfo.whishFee) * amountDataInfo.currencyRateWithBuffer).toFixed(2)} AUD
                  </p>
                  
                  <p className="font-bold pb-1">{amountDataInfo.givenAmount} USD</p>
                  {/* <p className="font-bold pb-1">{transection_password} </p> */}
                </div>
              </div>
            </div>


            {/* converted amount details */}
            <div className="pt-10">
              <div className="w-full mt-4 flex justify-between gap-4">
                <div className="w-full">
                  <p className="text-center uppercase">TOTAL IN USD</p>
                  <p className="py-4 border-[1px] rounded-md mt-3 border-gray-200 font-bold text-center text-nowrap text-lg">
                    ${amountDataInfo.totalAmount}
                  </p>
                </div>
                <div className="w-full">
                  <p className="text-center uppercase">TOTAL IN AUD</p>
                  <p className="py-4 border-[1px] rounded-md mt-3 border-gray-200 font-bold text-center text-nowrap text-lg">
                    ${amountDataInfo.convertedAmount} 
                  </p>
                </div>
              </div>

            </div>

            <NavLink to="/sendOTP">
              <button
                className="w-full pt-2 pb-2 ps-5 pe-5 rounded-xl text-white mt-5"
                style={{ backgroundColor: "#043BA0" }}
              >
                Approve & Send
              </button>
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SendingMoneyInfo;
