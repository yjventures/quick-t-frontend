import React, { useEffect, useState } from "react";
import timeIcon from "../../assets/images/timeIcon.png";
import "./paymentProcessing.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showFailedAlert, showSuccessAlert } from "../../utils/Tooast.Utils";
import { useQuery } from "@tanstack/react-query";
function PaymentProcessing() {
  const [order_id, setOrder_id] = useState(localStorage.getItem("order_id") || null);
  useEffect(() => {
    if (order_id === null) {
      setOrder_id(localStorage.getItem("order_id") || null);
    }
  }, [order_id])

  const navigate = useNavigate();
  // const session_id = window.location.search.split("=")[1];

  const saveTransaction = async () => {

    const res = await axios.post("http://localhost:5000/save-transaction", {
      data: {
        session_id: localStorage.getItem("sessionId"),
        order_id: order_id,
        user_id: localStorage.getItem("user_id"),
        jwt: localStorage.getItem("jwt"),
        receiverData: localStorage.getItem("receiverData"),
        amountData: localStorage.getItem("amountData"),
        sendFrom: localStorage.getItem("sendFrom"),
      }
    });

    if (res?.data?.statusCode === 200) {
      console.log(res.data);
      localStorage.setItem("transaction_id", res.data.id);
      localStorage.setItem("transaction_time", res.data.transaction_time);
      showSuccessAlert("Payment Successfull");
      return res.data;
    } else if (res?.data?.statusCode === 403) {
      showFailedAlert("You have already paid for this transaction, Thank you");
      localStorage.setItem("transaction_id", res.data.id);
      localStorage.setItem("transaction_time", res.data.transaction_time);
      navigate("/paymentSuccess");
      return Promise.reject(new Error("Session expired"));
    } else {
      console.log(res.data)
      // return res.data;
      showFailedAlert("Something went wrong, please try again", + res.data.message);
      navigate("/sendingMoneyInfo");
      return Promise.reject(new Error("Transaction failed"));
    }
  };

  const { data: transactionData, isLoading } = useQuery({
    queryKey: 'transactionData',
    queryFn: saveTransaction,
    enabled: order_id ? true : false,
  });

  React.useEffect(() => {
    console.log(isLoading, transactionData)
    if (!isLoading && transactionData.statusCode === 200) {
      // Do something with transactionData if needed
      navigate("/paymentSuccess");
    }
  }, [isLoading, transactionData, navigate]);


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
          </h1>
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
