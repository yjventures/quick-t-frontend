import React, { useRef } from "react";
import "./PaymentSuccess.css";
import Copy from "../../assets/images/Copy.png";
import html2pdf from "html2pdf.js";
function PaymentSuccess() {
  const cardRef = useRef();
  const imgRef = useRef();

  const downloadAsPdf = () => {
    const element = cardRef.current;
    const button = element.querySelector(".paymentSuccessButton");
    const img = imgRef.current;

    if (button) {
      button.style.display = "none"; // Hide the button before generating the PDF
    }

    if (img) {
      img.style.display = "none"; // Hide the image before generating the PDF
    }

    const opt = {
      margin: 1,
      filename: "payment_success.pdf",
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

        img.style.display = "block"; // Show the image again after generating the PDF

        window.location.reload();
      });
  };

  ////////////////////////////////////////////////////////////////
  //copy transfer number
  ////////////////////////////////////////////////////////////////
  const handleCopyText = () => {
    const textToCopy = document
      .querySelector(".transfernumber")
      .textContent.trim();
    navigator.clipboard.writeText(textToCopy);
  };

  return (
    <div>
      <div
        className="card pl-7 pr-10"
        ref={cardRef}
        style={{ backgroundColor: "#fff" }}
      >
        <div className="flex flex-col items-center mb-12">
          <svg
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

          <p className="paymentSuccessHeaderSectionFrontText">
            Payment Success!
          </p>
          <p className="paymentSuccessHeaderSectionSecondText">US$ 4000</p>
        </div>

        <p className="paymentSuccessLine mx-auto"></p>

        <div className="flex justify-between items-center ">
          <div>
            <p className="paymentSuccessStarting text-base lg:text-xl">
              Transfer Number
            </p>
            <p className="paymentSuccessStarting text-base lg:text-xl">
              Payment Time
            </p>
            <p className="paymentSuccessStarting text-base lg:text-xl">
              Payment Method
            </p>
            <p className="paymentSuccessStarting text-base lg:text-xl">
              Sender Name
            </p>
            <p className="paymentSuccessStarting text-base lg:text-xl">
              Receiver Name
            </p>
          </div>
          <div className="text-end">
            <div style={{ position: "relative" }}>
              <p className="paymentSuccessEnding transfernumber text-base lg:text-xl">
                QT-102
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
                onClick={handleCopyText}
              >
                <img ref={imgRef} src={Copy} alt="" />
              </div>
            </div>
            <p className="paymentSuccessEnding text-base lg:text-xl">
              25-02-2023, 13:22:16
            </p>
            <p className="paymentSuccessEnding text-base lg:text-xl">Card</p>
            <p className="paymentSuccessEnding text-base lg:text-xl">
              Antonio Roberto
            </p>
            <p className="paymentSuccessEnding text-base lg:text-xl">
              John Roberto
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center mt-7">
          <div>
            <p className="paymentSuccessStarting text-base lg:text-xl">
              Amount
            </p>
            <p className="paymentSuccessStarting text-base lg:text-xl">
              Transfer Fee
            </p>
          </div>
          <div className="text-end">
            <p className="paymentSuccessEnding text-base lg:text-xl">$ 4000</p>
            <p className="paymentSuccessEnding text-base lg:text-xl">$ 700</p>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={downloadAsPdf}
            className="mt-10 flex items-center gap-4 paymentSuccessButton"
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
      </div>
    </div>
  );
}

export default PaymentSuccess;
