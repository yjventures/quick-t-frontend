import React from "react";
import timeIcon from "../../assets/images/timeIcon.png";
import "./paymentProcessing.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showSuccessAlert } from "../../utils/Tooast.Utils";
import { useQuery } from "@tanstack/react-query";
function PaymentProcessing() {
  const session_id = window.location.search.split("=")[1];
  // console.log(session_id);
  const navigate = useNavigate();
  const saveTransaction = async () => {
    const res = await axios.post("http://localhost:5000/save-transaction", {
      data: {
        session_id: session_id,
        user_id: localStorage.getItem("user_id"),
        jwt: localStorage.getItem("jwt"),
        receiverData: localStorage.getItem("receiverData"),
        amountData: localStorage.getItem("amountData"),
      }
    });
    if (res.data.statusCode === 200) {
      console.log(res.data)
      localStorage.setItem("transaction_id", res.data.id)
      showSuccessAlert("Payment Successfull")
      navigate("/paymentSuccess")
    } else {
      showFailedAlert("Something went wrong, please try again")
      navigate("/sendingMoneyInfo")
    }
    return res.data;
  }

  React.useEffect(() => {
    saveTransaction()
  }, [session_id])
  // const {
  //   data,
  // } = useQuery({
  //   queryKey: ['saveTransection', session_id],
  //   queryFn: saveTransaction,
  //   // The query will not execute until the userId exists
  //   enabled: !!session_id,
  // })
  // console.log(data)
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
