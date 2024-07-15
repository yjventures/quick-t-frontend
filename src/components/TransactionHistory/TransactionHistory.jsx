import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function TransactionHistory() {
  const [showModalIndex, setShowModalIndex] = useState(null);
  const [transactionData, setTransactionData] = useState([]);
  useEffect(() => {
    let userId = localStorage.getItem("user_id");
    axios
      .get(
        `https://api.quickt.com.au/api/transactions?populate=*&filters[users_permissions_user][id][$eq]=${userId}`
      )
      .then((res) => {
        const sortedTransactions = res.data.data.sort(
          (a, b) =>
            b.attributes.transaction_date - a.attributes.transaction_date
        );
        console.log("transaction data is", sortedTransactions);
        setTransactionData(sortedTransactions);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  function formatTimestampToDDMMYYYY(timestamp) {
    const date = new Date(timestamp * 1000);

    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();

    const formattedDate = `${day < 10 ? "0" : ""}${day}-${
      month < 10 ? "0" : ""
    }${month}-${year}`;

    return formattedDate;
  }

  //////////////////////////
  //this is for status color change
  ///////////////////////////
  function getStatusColorClass(paymentStatus) {
    switch (paymentStatus) {
      case "paid":
        return "bg-green-500 text-white rounded-full";
      case "pending":
        return "bg-yellow-500 text-white rounded-full";
      case "cancel":
        return "bg-red-500 text-white rounded-full";
      default:
        return "bg-gray-500 text-white rounded-full"; // or use a default color if needed
    }
  }
  return (
    <div style={{ backgroundColor: "#f5f5f5", paddingTop: "50px" }}>
      <div
        className="card"
        style={{ maxWidth: "1200px", backgroundColor: "#fff" }}
      >
        <div>
          <NavLink to="/" className="flex items-center gap-3">
            <div>
              <svg
                width="18"
                height="13"
                viewBox="0 0 18 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 5.5H3.83L7.41 1.91L6 0.5L0 6.5L6 12.5L7.41 11.08L3.83 7.5H18V5.5Z"
                  fill="#333333"
                />
              </svg>
            </div>
            <p style={{ fontSize: "15px" }}>Back to home</p>
          </NavLink>
        </div>
        {transactionData.map((transaction, index) => {
          return (
            <div key={index}>
              <div className="w-full p-4 border-[2px] border-solid border-black-500 rounded-md shadow-md lg:max-w-xxl mt-8">
                <div className="w-32 h-5 bg-slate-600 rounded-full mt-[-30px]">
                  <p className="ps-4 text-white text-sm">
                    {formatTimestampToDDMMYYYY(
                      transaction.attributes.transaction_date
                    )}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="grid sm:grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-8 items-center">
                    <div className="text-center">
                      <p className="text-sm text-slate-700">Receiver Name</p>
                      <p className="text-md">
                        {transaction.attributes.receiver_name
                          .split(" ")
                          .slice(0, 4)
                          .join(" ")}
                        {transaction.attributes.receiver_name.split(" ")
                          .length > 4
                          ? " ..."
                          : ""}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-slate-700">Receiver Number</p>
                      <p className="text-md">
                        {transaction.attributes.receiver_number}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-slate-700">Status</p>
                      <p
                        className={`text-md ${getStatusColorClass(
                          transaction.attributes.payment_status
                        )}`}
                      >
                        {transaction?.attributes?.payment_status}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-slate-700">Amount</p>
                      <p className="text-md">
                        {transaction.attributes.amount_total +
                          " " +
                          transaction.attributes.currency}
                      </p>
                    </div>
                    <div className="col-span-2 md:col-span-1 lg:col-span-1 text-center">
                      <button
                        className="bg-white border border-gray-500 text-black py-2 px-4 rounded-md"
                        onClick={() => setShowModalIndex(index)}
                      >
                        View Details
                      </button>
                    </div>
                    {showModalIndex === index && (
                      <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                          <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                              {/*header*/}
                              <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                <h3 className="text-lg font-semibold">
                                  Transaction Details
                                </h3>
                                <button
                                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                  onClick={() => setShowModalIndex(null)}
                                >
                                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                    ×
                                  </span>
                                </button>
                              </div>
                              {/*body*/}
                              <div className="relative p-6 flex-auto">
                                <div className="flex flex-col md:flex-row lg:flex-row justify-between gap-4 md:gap-20 lg:gap-32">
                                  {/* for left side */}
                                  <div>
                                    <div>
                                      <p className="text-sm text-slate-700 ">
                                        Receiver Name
                                      </p>
                                      <p className="text-md">
                                        {transaction.attributes.receiver_name}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-slate-700 mt-4">
                                        Receiver Number
                                      </p>
                                      <p className="text-md">
                                        {transaction.attributes.receiver_number}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-slate-700 mt-4">
                                        Receiver Address
                                      </p>
                                      <p className="text-md">
                                        {
                                          transaction.attributes
                                            .receiver_address
                                        }
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-slate-700 mt-4">
                                        Payment Status
                                      </p>
                                      <p
                                        className={`text-md text-center w-20 ${getStatusColorClass(
                                          transaction.attributes.payment_status
                                        )}`}
                                      >
                                        {transaction.attributes.payment_status}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-slate-700 mt-4">
                                        Transfer Perpose
                                      </p>
                                      <p className="text-md">
                                        {
                                          transaction.attributes
                                            .transfer_purpose
                                        }
                                      </p>
                                    </div>
                                  </div>
                                  {/* for right side */}
                                  <div>
                                    <div>
                                      <p className="text-sm text-slate-700">
                                        Amount
                                      </p>
                                      <p className="text-md">
                                        {transaction.attributes.amount_total}
                                      </p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-slate-700 mt-4">
                                        Payment Method
                                      </p>
                                      <p className="text-md">
                                        {
                                          transaction.attributes
                                            .payment_method_type
                                        }
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/*footer*/}
                              <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                <button
                                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={() => setShowModalIndex(null)}
                                >
                                  Close
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TransactionHistory;
