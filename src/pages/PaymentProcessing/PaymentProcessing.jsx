import React from "react";
import timeIcon from "../../assets/images/timeIcon.png";
import "./paymentProcessing.css";
function PaymentProcessing() {
  return (
    <div
      className="h-full flex justify-center items-center my-auto"
      style={{ height: "100vh" }}
    >
      <div className="card p-10 lg:p-32" style={{ backgroundColor: "#fff" }}>
        <div className="flex flex-col items-center justify-center">
          <img
            src={timeIcon}
            alt="processing"
            className="paymentProcessingImage"
          />
          <h1 className="paymentProcessingHeadingText text-lg lg:text-2xl">
            Processing your Payment
          </h1>{" "}
          <br />
          <p className="paymentProcessingNormalText text-lg lg:text-2xl">
            Please wait...
          </p>
        </div>
      </div>
    </div>
  );
}

export default PaymentProcessing;
