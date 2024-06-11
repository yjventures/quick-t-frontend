import React, { useRef, useState } from "react";
import "./HeroSection.css";
import verifiedtick from "../../assets/images/verifiedtick.png";
import Select from "react-select";
import stopCircle from "../../assets/images/stop-circle.png";
import tickCircle from "../../assets/images/tick-circle.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { showFailedAlert } from "../../utils/Tooast.Utils";

function HeroSection({ title, description }) {
  const [clickedCustomAmount, setClickedCustomAmount] = useState(false);
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  // console.log(currency_buffer, gateway_fee)  
  // get countries api using react query
  const {
    isPending: pendingCountries,
    error: countriesError,
    data: countries,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: () =>
      fetch("http://localhost:1337/api/countries")
        .then((res) => res.json())
        .then((data) => data?.data),
  });


  // get quick transfer api using react query
  const {
    isPending: pendingQuickTransfers,
    error: transfersError,
    data: quickTransfers,
  } = useQuery({
    queryKey: ["quick-transfers"],
    queryFn: () =>
      fetch("http://localhost:5000/get-quick-transfers")
        .then((res) => res.json())
        .then((data) => data?.data),
  });

  const options = [
    {
      value: "lebanon",
      label: "Lebanon",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Flag_of_Lebanon.svg/1200px-Flag_of_Lebanon.svg.png?20190109154742",
    },
    {
      value: "australia",
      label: "Australia",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Flag_of_Australia.svg/2560px-Flag_of_Australia.svg.png",
    },
  ];
  const [customAmount, setCustomAmount] = useState(null);
  const [selectedCard, setSelectedCard] = useState(1);
  const [defaultAmount, setDefaultAmount] = useState(
    quickTransfers ? quickTransfers[0]?.attributes?.amount : 100
  );
  const [transferFee, setTransferFee] = useState(
    quickTransfers ? quickTransfers[0]?.attributes?.fee : 4
  );

  const handleCardClick = (index, amount, transferfee) => {
    setSelectedCard(index);
    setDefaultAmount(amount);
    setTransferFee(transferfee);
    setCustomAmount(null);
  };
  // console.log(defaultAmount)
  // console.log(customAmount)

  const {
    isPending: pendingConvertedAmount,
    error: convertedAmountError,
    data: convertedAmountInfo,
  } = useQuery({
    queryKey: ["convert-amount", defaultAmount, customAmount],
    queryFn: () =>
      fetch("http://localhost:5000/get-currency-rate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: clickedCustomAmount ? Number(customAmount) : Number(defaultAmount),
          // from: "aud",
          // to: "usd",
        }),

      })
        .then((res) => res.json())
        .then((data) => data?.data),
  });

  // console.log(convertedAmountInfo)
  /////////////////////////////////////////////
  //input value take
  /////////////////////////////////////////////

  let customAmmountRef = useRef(null);

  // console.log(convertedAmountInfo)
  // const [selectedOption, setSelectedOption] = useState(null);
  // const sentTo = "lebanon";
  // const sendFrom = selectedOption?.attributes?.name;
  // console.log(sendFrom);
  const handleCardButton = () => {
    if (customAmount == "" || customAmount == 0 || convertedAmountInfo == undefined) {
      showFailedAlert("Please enter amount");
      return;
    }
    // console.log(convertedAmountInfo)
    // return
    // const data = {
    //   sendFrom: 'australia',
    //   sendTo: sentTo,
    // };
    // // if custom amount is clicked then take custom amount else take default amount
    // if (clickedCustomAmount) {
    //   data.transfer_amount = Number(customAmount);
    //   data.transfer_fees = (Number(customAmount) * Number(transfer_percentage)) / 100;
    //   data.transfer_total = Number(customAmount) + Number(data.transfer_fees) + Number(platform_fee);
    // } else {
    //   data.transfer_amount = Number(defaultAmount);
    //   data.transfer_fees = Number(transferFee);
    //   data.transfer_total = Number(defaultAmount) + Number(transferFee) + Number(platform_fee);
    // }

    localStorage.setItem("amountData", JSON.stringify(convertedAmountInfo));
    if (jwt) {
      navigate("/sendingMoney");
    } else {
      navigate("/login");
    }
  };


  return (
    <div className="flex flex-col md:flex-row" style={{ paddingTop: "80px" }}>
      {/* Left Part */}
      <div
        className="w-full md:w-1/2 flex items-center justify-center pl-5"
        style={{ height: "90vh", backgroundColor: "#EEE" }}
      >
        <div className="container lg:ms-40">
          <p className="font-bold text-5xl sm:md:text-6xl lg:text-6xl xl:text-6xl herosectionLeftSideHeadingText">
            {title ? (
              <React.Fragment>
                {title?.split(" ").map((word, index, array) => (
                  <React.Fragment key={index}>
                    {index % 3 === 0 && index !== 0 ? <br /> : null}
                    {word}{" "}
                  </React.Fragment>
                ))}
              </React.Fragment>
            ) : (
              "Fastest way to send money to Lebanon, instantly."
            )}
          </p>
          <p className="herosectionLeftSideNormalText">
            {description
              ? description
              : "From security and privacy to care and accountability - what matters to you matters to us."}
          </p>
          <div className="herosectionLeftSideButtonSection">
            <button className="herosectionLeftSideButton">Get Started</button>
            <a href="/hello" className="herosectionLeftSideLink">
              Learn More
            </a>
          </div>
          <div className="heroSectionLeftSideVerified">
            <img src={verifiedtick} />
            <p className="heroSectionLeftSideVerifiedLargeText">
              Licensed by: ASIC
            </p>
            <p className="heroSectionLeftSideVerifiedSmallText">
              A.C.N 649535688
            </p>
          </div>
        </div>
      </div>

      {/* Right Part */}
      <div
        className="w-full md:w-1/2 flex items-center justify-center sm:pl-5 pr-5"
        style={{ height: "90vh", backgroundColor: "#EEE" }}
      >
        <div
          className="heroSectionCard shadow-xl w-full sm:w-3/3 md:w-4/5 xl:w-2/4 md:h-3/3 xl:h-3/3"
          style={{
            backgroundColor: "#FFF",
            padding: "18px 24px",
            zIndex: "1",
          }}
        >
          <p
            style={{ fontSize: "14px", fontWeight: "400", marginBottom: "8px" }}
          >
            Send From
          </p>
          <Select
            defaultValue={options[1]}
            isDisabled
            options={options}
            formatOptionLabel={(country) => (
              <div className="flex">
                <img
                  src={country.image}
                  alt="country-image"
                  style={{
                    height: "24px",
                    width: "24px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
                <span>{country.label}</span>
              </div>
            )}
          />

          <p className="heroSectionSendTo">Send To</p>
          <Select
            defaultValue={options[0]}
            isDisabled
            options={options}
            formatOptionLabel={(country) => (
              <div className="flex">
                <img
                  src={country.image}
                  alt="country-image"
                  style={{
                    height: "24px",
                    width: "24px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
                <span>{country.label}</span>
              </div>
            )}
          />
          <br />
          {/* quick transfer */}
          <p className="heroSectionQuickTransfer">Quick Transfer</p>
          <div className="flex gap-2 mt-5 justify-evenly">
            {pendingQuickTransfers ? (
              <p>Loading...</p>
            ) : (
              // sorting quick transfers by amount
              quickTransfers?.sort((a, b) => a?.attributes?.amount - b?.attributes?.amount)?.map(
                (transfer, index) =>
                  transfer?.attributes?.enabled == true && (
                    <div
                      key={index}
                      className={`flex items-center justify-between p-3 cursor-pointer relative border-[1px] ${clickedCustomAmount == false &&
                        selectedCard === index + 1
                        ? "bg-gray-100 rounded-lg"
                        : " rounded-lg"
                        }`}
                      onClick={() => {
                        customAmmountRef.value = "";
                        handleCardClick(
                          index + 1,
                          transfer?.attributes?.amount,
                          transfer?.attributes?.fee
                        );
                        setClickedCustomAmount(false);
                      }}
                    >
                      <div className=" absolute top-2 right-2">
                        {clickedCustomAmount == false &&
                          selectedCard === index + 1 ? (
                          <img src={tickCircle} alt="tick" className="max-w-5 max-h-5" />
                        ) : (
                          <img src={stopCircle} alt="tick-false" className="max-w-4 max-h-4" />
                        )}
                      </div>
                      <div className="pe-2">
                        <p className="heroSectionRightSideUSD">
                          $ {transfer?.attributes?.amount}
                        </p>
                        <p className="heroSectionRightSideFee text-[10px]">
                          Amount in <span className="font-bold">AUD {transfer?.attributes?.convertedAmount}</span>
                          {/* {transfer?.attributes?.fee} */}
                        </p>
                      </div>

                    </div>
                  )
              )
            )}
          </div>

          {/* amount send and receive section  */}
          <div className="w-full mt-4 flex justify-between gap-4">
            <div className="w-full">
              <p className="text-center uppercase">You send </p>
              <p className="py-4 border-[1px] rounded-md mt-3 border-gray-200 font-bold text-center">
                AUD {pendingConvertedAmount ? "..." : clickedCustomAmount ? customAmount == 0 ? 0 : convertedAmountInfo?.convertedAmount : convertedAmountInfo?.convertedAmount}
              </p>
            </div>
            <div className="w-full">
              <p className="text-center uppercase">You Receive </p>
              <p className="py-4 border-[1px] rounded-md mt-3 border-gray-200 font-bold text-center text-nowrap">
                USD {clickedCustomAmount ? customAmount == 0 ? 0 : customAmount : defaultAmount}
              </p>
            </div>
          </div>

          {/* custom amount */}
          <input
            // onClick={() => setClickedCustomAmount(true)}
            onChange={(e) => {
              setClickedCustomAmount(true);
              setCustomAmount(e.target.value);
            }}
            value={customAmount}
            ref={(input) => (customAmmountRef = input)}
            placeholder="or custom (USD) amount "
            className="mt-4 rounded-xl border-none text-black heroSectionCustommunt outline-none"
          />
          {
            <button
              className="heroSectionRightSideButton"
              onClick={handleCardButton}
            >
              {jwt ? "Send Money" : "Register / Login to transfer"}
            </button>
          }
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
