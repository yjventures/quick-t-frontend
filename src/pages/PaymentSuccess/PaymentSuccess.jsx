import React, { useRef } from "react";
import "./PaymentSuccess.css";
import Copy from "../../assets/images/Copy.png";
import html2pdf from "html2pdf.js";
import { showSuccessAlert } from "../../utils/Tooast.Utils";
import { useNavigate } from "react-router-dom";
function PaymentSuccess() {
  const cardRef = useRef();
  const imgRef = useRef();

  const downloadAsPdf = () => {
    const element = cardRef.current;
    const button = element.querySelector(".paymentSuccessButton");
    const img = imgRef.current;
    const homeButton = element.querySelector(".homeButton");
    if (button) {
      button.style.display = "none"; // Hide the button before generating the PDF
      homeButton.style.display = "none";
    }

    if (img) {
      img.style.display = "none"; // Hide the image before generating the PDF
    }
    const transaction_id = localStorage.getItem("transaction_id");
    const opt = {
      margin: 1,
      filename: `QT-${transaction_id} payment_success.pdf`,
      image: { type: "jpeg", quality: 0.98 }, // Adjust quality here
      html2canvas: { scale: 2 }, // Adjust scale here
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf()
      .from(element)
      .set(opt)
      .save()
      .then(() => {
        button.style.display = "block"; // Show the button again after generating the PDF
        homeButton.style.display = "block";
        img.style.display = "block"; // Show the image again after generating the PDF
        window.location.reload();
      });
  };

  const navigate = useNavigate();
  // const transaction_id = 
  const receiverDataInfo = JSON.parse(localStorage.getItem("receiverData"));
  const amountDataInfo = JSON.parse(localStorage.getItem("amountData"));
  const userName = localStorage.getItem("first_name") + " " + localStorage.getItem("last_name");
  const transaction_password = localStorage.getItem("transaction_password");

  const time = new Date().toLocaleString();

  // const unixTimestamp = localStorage.getItem("transaction_time");
  // const date = new Date(unixTimestamp * 1000);
  // const localTime = date.toLocaleString();

  function formatISODate(isoDate) {
    const date = new Date(isoDate);

    // Define month names
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const day = date.getDate();
    const month = months[date.getMonth()]; // Get month name
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // Format hours and determine AM/PM
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Construct the formatted date string
    const formattedDate = `${day} ${month} ${year}, ${hours}:${minutes}${ampm}`;

    return formattedDate;
  }

  // console.log(localTime);
  return (
    <div className="my-10">
      <div
        className="card pl-7 pr-10"
        ref={cardRef}
        style={{ backgroundColor: "#fff" }}
      >
        <div className="flex flex-col items-center">
          <svg
            className="-mt-4"
            width="95"
            height="95"
            viewBox="0 0 95 95"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="47.4845"
              cy="47.6003"
              r="46.631"
              fill="#23A26D"
              fill-opacity="0.12"
            />
            <path
              d="M46.6505 25.3951C34.4155 25.3951 24.4453 35.3653 24.4453 47.6004C24.4453 59.8355 34.4155 69.8056 46.6505 69.8056C58.8856 69.8056 68.8558 59.8355 68.8558 47.6004C68.8558 35.3653 58.8856 25.3951 46.6505 25.3951ZM57.2646 42.4932L44.6743 55.0835C44.3634 55.3944 43.9415 55.5721 43.4974 55.5721C43.0533 55.5721 42.6314 55.3944 42.3205 55.0835L36.0364 48.7995C35.3925 48.1555 35.3925 47.0897 36.0364 46.4457C36.6804 45.8017 37.7462 45.8017 38.3902 46.4457L43.4974 51.5529L54.9109 40.1394C55.5548 39.4955 56.6207 39.4955 57.2646 40.1394C57.9086 40.7834 57.9086 41.827 57.2646 42.4932Z"
              fill="#23A26D"
            />
          </svg>

          <p className="paymentSuccessHeaderSectionFrontText text-center mt-3">
            Payment Success!
          </p>
          <p className="paymentSuccessHeaderSectionSecondText">US ${Number(amountDataInfo.totalAmount)}</p>
        </div>

        <p className="mx-auto h-[1px] bg-gray-200 my-8"></p>

        <div className="flex justify-between items-center ">
          <div>
            <p className="paymentSuccessStarting text-base lg:text-xl">
              Transfer Number
            </p>
            <p className="paymentSuccessStarting text-base lg:text-xl">
              Transaction Password
            </p>
            <p className="paymentSuccessStarting text-base lg:text-xl">
              Payment Time
            </p>
            {/* <p className="paymentSuccessStarting text-base lg:text-xl">
              Payment Method
            </p> */}
            <p className="paymentSuccessStarting text-base lg:text-xl">
              Sender Name
            </p>
            <p className="paymentSuccessStarting text-base lg:text-xl">
              Receiver Name
            </p>
          </div>
          <div className="text-end">
            <div
              className="me-6"
              style={{ position: "relative" }}
              onClick={() => {
                navigator.clipboard.writeText(`QT-${localStorage.getItem("transaction_id")}`)
                showSuccessAlert("Copied to clipboard")
              }}
            >
              <p className="paymentSuccessEnding transfernumber text-base lg:text-xl">
                QT-{localStorage.getItem("order_id")}
              </p>
              <div
                style={{
                  position: "absolute",
                  top: "0px",
                  right: "-25px",
                  height: "24px",
                  width: "24px",
                  cursor: "pointer",
                }}
              // onClick={handleCopyText}
              >
                <img ref={imgRef} src={Copy} alt="icon" />
              </div>
            </div>
            <div
              className="me-6"
              style={{ position: "relative" }}
              onClick={() => {
                navigator.clipboard.writeText(localStorage.getItem("transaction_password"))
                showSuccessAlert("Copied to clipboard")
              }}
            >
              <p className="paymentSuccessEnding transfernumber text-base lg:text-xl">
                {transaction_password}
              </p>
              <div
                style={{
                  position: "absolute",
                  top: "0px",
                  right: "-25px",
                  height: "24px",
                  width: "24px",
                  cursor: "pointer",
                }}
              // onClick={handleCopyText}
              >
                <img ref={imgRef} src={Copy} alt="icon" />
              </div>
            </div>
            <p className="paymentSuccessEnding text-base lg:text-xl">
              {formatISODate(localStorage.getItem("transaction_time"))}
            </p>
            {/* <p className="paymentSuccessEnding text-base lg:text-xl">Card</p> */}
            <p className="paymentSuccessEnding text-base lg:text-xl">
              {userName}
            </p>
            <p className="paymentSuccessEnding text-base lg:text-xl">
              {receiverDataInfo.first_name} {receiverDataInfo.last_name}
            </p>

          </div>
        </div>

        <div className="flex justify-between items-center ">
          <div>
            <p className="paymentSuccessStarting text-base lg:text-xl">
              Amount
            </p>
            <p className="paymentSuccessStarting text-base lg:text-xl">
              Platform Fee
            </p>
            <p className="paymentSuccessStarting text-base lg:text-xl">
              Gateway Fee
            </p>
          </div>
          <div className="text-end">
            <p className="paymentSuccessEnding text-base lg:text-xl">$ {Number(amountDataInfo.givenAmount).toFixed(2)}</p>
            <p className="paymentSuccessEnding text-base lg:text-xl">$ {Number(amountDataInfo.transferFee + amountDataInfo.gatewayFee).toFixed(2)}</p>
            <p className="paymentSuccessEnding text-base lg:text-xl">$ {Number(amountDataInfo.whishFee).toFixed(2)}</p>
          </div>
        </div>
        {/* amount send and receive section  */}
        <div className="w-full mt-4 flex justify-between gap-4">
          <div className="w-full">
            <p className="text-center uppercase">You sent </p>
            <p className="py-4 border-[1px] rounded-md mt-3 border-gray-200 font-bold text-center">
              AUD {amountDataInfo.convertedAmount}
            </p>
          </div>
          <div className="w-full">
            <p className="text-center uppercase">They Received </p>
            <p className="py-4 border-[1px] rounded-md mt-3 border-gray-200 font-bold text-center text-nowrap">
              USD {amountDataInfo.givenAmount}
            </p>
          </div>
        </div>

        <div className="flex justify-center" >
          <button
            onClick={downloadAsPdf}
            className="mt-10 flex items-center gap-4 paymentSuccessButton outline-none border-2 hover:bg-green-100 transition"
          >
            <svg
              width="41"
              height="41"
              viewBox="0 0 41 41"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M15.8594 19.7388L20.1228 24.0022L24.3862 19.7388"
                stroke="#070707"
                stroke-opacity="0.72"
                stroke-width="2.49809"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M20.125 6.94849V23.8855"
                stroke="#070707"
                stroke-opacity="0.72"
                stroke-width="2.49809"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M33.6463 20.5714C33.6463 27.9324 28.6501 33.8945 20.3231 33.8945C11.9962 33.8945 7 27.9324 7 20.5714"
                stroke="#070707"
                stroke-opacity="0.72"
                stroke-width="2.49809"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Get PDF Receipt
          </button>

        </div>
        <button
          style={{
            backgroundColor: "#23A26D",
            color: "#fff",
            width: "100%",
            marginTop: "20px",
            marginBottom: "20px",
          }}
          onClick={() => {
            // localStorage.removeItem("receiverData");
            // localStorage.removeItem("transaction_id");
            navigate('/')
          }}
          className="py-2 rounded-md text-white homeButton"
        >
          Go Home
        </button>

      </div>
    </div>
  );
}

export default PaymentSuccess;
