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
      <div style={divStyle} className="">
        <img
          src={secondStepper}
          className=" mx-auto mt-10 mb-10"
          alt=""
          style={{ width: "50%", height: "50px" }}
        />
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
