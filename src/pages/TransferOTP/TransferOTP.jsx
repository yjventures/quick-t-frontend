import React, { useEffect, useState } from "react";
import Rectangle from "../../assets/images/Rectangle.png";
import paymentcheck from "../../assets/images/payment-check.png";
import Headers from "../../components/Headers";
import secondStepper from "../../assets/images/secondStepper.png";
import ReactCodeInput from "react-code-input";

import securityTick from "../../assets/images/securityTick.png";
import axios from "axios";
import { showFailedAlert, showSuccessAlert } from "../../utils/Tooast.Utils";
import { useNavigate } from "react-router-dom";
function TransferOTP() {
  const navigate = useNavigate()
  const [countWrongOtp, setCountWrongOtp] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [timer, setTimer] = useState(false);
  const [countTime, setCountTime] = useState(300); /// 3000 seconds
  // check if timer is true
  useEffect(() => {
    if (timer) {
      const intervalId = setInterval(() => {
        setCountTime(countTime - 1);
      }, 1000);

      if (countTime === 0) {
        setTimer(false);
        setCountTime(300);
        setCountWrongOtp(1);
      }
      return () => clearInterval(intervalId);
    }
  }, [timer, countTime]);

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

  const handleSubmit = async () => {
    try {
      // if not 3 times wrong otp
    if (inputValue.length < 4) {
      showFailedAlert("Please enter 4 digit PIN");
      return;
    }

    if (countWrongOtp < 3) {
      const data = {
        code: inputValue,
        jwt: localStorage.getItem("jwt"),
      };
      JSON.stringify(data);
      const res = await axios.post(
        "https://microservice.quickt.com.au/checkSecurity", data
      );
      // 200 = success | 404 = wrong otp | 403 = System error or wrong jwt
      // transaction_id of db is order id here
      // console.log(res?.data)
      const order_id = res?.data?.order_id;
      // order_id.toString();
      const amountData = localStorage.getItem("amountData");
      localStorage.setItem("order_id", order_id);
      // console.log(amountData);
      // return
      if (res.data.statusCode == 200) {
        // showSuccessAlert("Payment Successfull")
        const response = await axios.post(
          "https://microservice.quickt.com.au/checkout-session-new",
          {
            data: {
              amount: amountData,
              order_id: order_id,
            }
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // console.log(response)
        // console.log(response?.data?.id)
        // console.log(response?.data?.status)
        // localStorage.setItem("sessionId", response?.data.id);
        window.location.href = 'http://127.0.0.1:5500/test/index.html?sessionId=' + response?.data.id;

        // // if (response?.data?.status === 200) {
        // //   localStorage.setItem("sessionId", response?.data.id);
        // //   navigate('/payment')
        // // } else {
        // //   alert("Something went wrong, please try again later");
        // // }
        // return;
        // const sessionUrl = response?.data;
        // if (sessionUrl) {
        //   // Redirect the user to the Stripe checkout session URL
        //   window.open(sessionUrl, "_self");
        // } else {
        //   // Handle the case where sessionUrl is not available
        //   showFailedAlert("Something went wrong, please try again later");
        // }
      } else if (statusCode === 403) {
        showFailedAlert("Something went wrong, please try again later");
      } else {
        showFailedAlert("Wrong PIN")
        setCountWrongOtp(countWrongOtp + 1)
      }
    } else {
      showFailedAlert(
        "You have entered wrong PIN 3 times, Please try after 5 minutes"
      );
      setTimer(true);
      return;
    }
    } catch (error) {
      console.log(error)
      showFailedAlert("Something went wrong, please try again later");
    }
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
          <div className="form pt-10">
            <div className="mx-auto pb-5">
              <img src={paymentcheck} alt="icon" />
            </div>
            <p className="text-center">Enter the PIN to complete transfer</p>
            <div className="flex gap-10 justify-center mt-5">
              <ReactCodeInput
                onChange={(e) => {
                  setInputValue(e);
                }}
                value={inputValue}
                inputStyle={defaultInputStyle}
                fields={4}
              />

              {/* <img src={securityTick} alt="icon" /> */}
            </div>
            <button
              disabled={countTime < 300}
              onClick={handleSubmit}
              className="flex justify-center items-center w-2/3 pt-2 pb-2 ps-5 pe-5 rounded-xl text-white mt-5 mx-auto"
              // change background color to #ccc when disabled
              style={{ backgroundColor: countTime < 300 ? "#999" : "#043BA0" }}
            >
              {countTime < 300 ? `Try again in ${countTime} seconds` : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransferOTP;
