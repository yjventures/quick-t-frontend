import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function TransactionHistory() {
  const [showModalIndex, setShowModalIndex] = useState(null);
  const [transactionData, setTransactionData] = useState([]);
  useEffect(() => {
    let userId = localStorage.getItem("user_id");
    axios.get(`https://api.quickt.com.au/api/transactions?populate=*&filters[users_permissions_user][id][$eq]=${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    })
      .then((res) => {
        const sortedTransactions = res.data.data.sort(
          (a, b) =>
            b.attributes.transaction_date - a.attributes.transaction_date
        );
        // console.log("transaction data is", sortedTransactions);
        setTransactionData(sortedTransactions);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  function formatTimestampToDDMMYYYY(timestamp) {
    const transaction_date = new Date(timestamp);
    return transaction_date.toLocaleDateString('us-EN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
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
    <div className="min-h-screen" style={{ backgroundColor: "#f5f5f5", paddingTop: "50px" }}>
      <div
        className="card min-h-[90vh]"
        style={{ maxWidth: "1200px", backgroundColor: "#fff" }}
      >
        <p
          className="mb-10"
          style={{
            color: "#2F80ED",
            fontSize: "20px",
            fontWeight: "500",
          }}
        >
          Transaction History
        </p>
        {
          transactionData.length === 0 && (
            <div className="flex justify-center items-center h-[50vh]">
              <p className="text-lg text-gray-500">No transaction found</p>
            </div>
          )
        }
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
                    <div className="text-start pt-4">
                      <p className="text-sm text-slate-700">Receiver Name</p>
                      <p className="text-md mt-1">
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
                      <p className="text-md mt-1 ">
                        {transaction.attributes.receiver_number}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-slate-700">Gateway Status</p>
                      <p
                        className={`text-md bg-gray-500 text-white rounded-full mt-1`}
                      >
                        {transaction?.attributes?.stripe_status}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-slate-700">Amount </p>
                      <p className="text-md mt-1">
                        {transaction.attributes.transfer_amount +
                          " " +
                          transaction.attributes.currency}
                      </p>
                    </div>
                    <div className="col-span-2 md:col-span-1 lg:col-span-1 text-center mt-2">
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
                          <div className="relative w-auto my-6 mx-auto max-w-[600px]">
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
                                  <div className="flex justify-center items-start flex-col">
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
                                    {/* <div>
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
                                    </div> */}
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
                                  <div className="flex flex-col gap-3">
                                    {/* paid total amount */}
                                    <div>
                                      <p className="text-sm text-slate-700">
                                        Sender Paid
                                      </p>
                                      <p className="text-md">
                                        {transaction.attributes.amount_total} {transaction.attributes.currency}
                                      </p>
                                    </div>

                                    {/* Fees deducted */}
                                    <div>
                                      <p className="text-sm text-slate-700">
                                        Fees
                                      </p>
                                      <p className="text-md">
                                        {transaction.attributes.amount_total - transaction.attributes.transfer_amount} {transaction.attributes.currency}
                                      </p>
                                    </div>

                                    {/* Receivers amount */}
                                    <div>
                                      <p className="text-sm text-slate-700">
                                        Receiver Receives
                                      </p>
                                      <p className="text-md">
                                        {transaction.attributes.transfer_amount} {transaction.attributes.currency}
                                      </p>
                                    </div>

                                    <div>
                                      <p className="text-sm text-slate-700 mt-4">
                                        Payment Date
                                      </p>
                                      <p className="text-md">
                                        {
                                          formatTimestampToDDMMYYYY(
                                            transaction.attributes.transaction_date
                                          )
                                        }
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                {/* note if available */}
                                {
                                  transaction?.attributes?.note && (
                                    <div className="mt-2">
                                      <p className="text-sm text-slate-700">
                                        Note
                                      </p>
                                      <p className="text-md">
                                        {transaction?.attributes?.note}

                                      </p>
                                    </div>)
                                }
                              </div>
                              {/*footer*/}
                              <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
                                <div>
                                  <div className="md:flex gap-2 items-center">
                                    <p className="text-sm text-slate-700">
                                      Password
                                    </p>
                                    <p className="text-md">
                                      {transaction?.attributes?.transaction_password}
                                    </p>
                                    <p
                                      className="w-5 h-5 cursor-pointer"
                                      onClick={() => {
                                        navigator.clipboard.writeText(transaction?.attributes?.transaction_password);
                                        alert("Password copied to clipboard");
                                      }}
                                    >
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
                                      </svg>
                                    </p>
                                  </div>
                                  <sub className=" font-bold">Never share your password*</sub>

                                </div>
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
