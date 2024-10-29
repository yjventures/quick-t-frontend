import React, { useEffect, useRef, useState } from "react";
import "./heroSection.css";
import verifiedtick from "../../assets/images/verifiedtick.png";
import approximate from "../../assets/images/approximate.png";
import Select from "react-select";
import stopCircle from "../../assets/images/stop-circle.png";
import tickCircle from "../../assets/images/tick-circle.png";
import flag from "../../assets/images/flag.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { showFailedAlert } from "../../utils/Tooast.Utils";
import axios from "axios";


function HeroSection({ title, description }) {
  const [clickedCustomAmount, setClickedCustomAmount] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('Australia');
  console.log(selectedCountry)
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  // console.log(currency_buffer, gateway_fee)  
  // get countries api using react query
  // const {
  //   isPending: pendingCountries,
  //   error: countriesError,
  //   data: countries,
  // } = useQuery({
  //   queryKey: ["countries"],
  //   queryFn: () =>
  //     fetch("https://api.quickt.com.au/api/countries")
  //       .then((res) => res.json())
  //       .then((data) => data?.data),
  // });


  // get quick transfer api using react query
  const {
    isPending: pendingQuickTransfers,
    error: transfersError,
    data: quickTransfers,
  } = useQuery({
    queryKey: ["quick-transfers"],
    queryFn: () =>
      fetch("https://microservice.quickt.com.au/get-quick-transfers")
        .then((res) => res.json())
        .then((data) => data?.data),
  });


  const {
    data: countries,
    error: countriesError,
    isLoading: pendingCountries }
    = useQuery({
      queryKey: ['countries'],
      queryFn: () => axios.get("https://microservice.quickt.com.au/api/countries")
        .then(res => res.data.data)
    });

  console.log(countries, countriesError, pendingCountries)
  // console.log(countries?.list)

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


  const {
    isPending: pendingConvertedAmount,
    error: convertedAmountError,
    data: convertedAmountInfo,
  } = useQuery({
    queryKey: ["convert-amount", defaultAmount, customAmount],
    queryFn: () =>
      fetch("https://microservice.quickt.com.au/get-currency-rate", {
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
    if (selectedCountry == "") {
      showFailedAlert("Please select country");
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
    localStorage.setItem("sendFrom", selectedCountry);
    if (jwt) {
      navigate("/sendingMoney");
    } else {
      navigate("/login");
    }
  };


  const QuickTransferSkeleton = () => {

    return (
      <div className="flex justify-between items-center w-full gap-2">
        {
          [1, 2, 3].map((_, index) => (
            <div role="status" className="flex items-start justify-start flex-col h-[85px] w-full bg-gray-300 rounded-lg animate-pulse p-2">
              <div class="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-full my-2"></div>
              <div class="h-[10px] bg-gray-200 rounded-full dark:bg-gray-700 w-full mb-2"></div>
              <div class="h-[8px] bg-gray-200 rounded-full dark:bg-gray-700 w-1/2 ms-[1px]"></div>
              <span className="sr-only">Loading...</span>
            </div>
          ))
        }

      </div>


    )
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row items-center justify-between h-full pb-10 max-w-7xl mx-auto "  >
      {/* Left Part */}
      <div
        className="w-full flex items-start justify-center px-5"
      // style={{ height: "90vh"}}
      >
        <div className="container">
          <div className="font-bold text-3xl lg:text-4xl">
            {title ? <p style={{
              lineHeight: "1.4",
            }}>
              {title?.split(" ").map((word, index, array) => (
                <React.Fragment key={index} >
                  {index % 4 === 0 && index !== 0 ? <br /> : null}
                  {word}{" "}
                </React.Fragment>
              ))}
            </p> : (
              "Fastest way to send money to Lebanon, instantly."
            )}
          </div>
          <p className="herosectionLeftSideNormalText text-2xl">
            {description
              ? description
              : "From security and privacy to care and accountability - what matters to you matters to us."}
          </p>
          <div className="herosectionLeftSideButtonSection">
            <NavLink
              to={'/login'}
              className="herosectionLeftSideButton"
            >
              Get Started
            </NavLink>
            <NavLink
              to={'/help-center'}
              className="herosectionLeftSideLink"
            >
              Learn More
            </NavLink>
          </div>
          {/* Licence ASIC */}
          <div className="heroSectionLeftSideVerified">
            <img src={verifiedtick} />
            <p className="heroSectionLeftSideVerifiedLargeText">
              Licensed by: ASIC
            </p>
            <p className="heroSectionLeftSideVerifiedSmallText">
              A.C.N 649535688
            </p>
          </div>
          {/* AUSTRAC dealer */}
          <div className="heroSectionLeftSideVerified">
            <img src={verifiedtick} />
            <p className="heroSectionLeftSideVerifiedLargeText">
              Remittance dealer: AUSTRAC
            </p>
            <p className="heroSectionLeftSideVerifiedSmallText">
              IND100789859-001
            </p>
          </div>
        </div>
      </div>

      {/* Right Part */}
      <div
        className="w-full flex items-center md:justify-end justify-center px-5 "
      // style={{ height: "90vh"}}
      >
        <div
          className="heroSectionCard shadow-xl w-full max-w-[500px] mt-4"
          style={{
            backgroundColor: "#FFF",
            padding: "18px 24px",
            zIndex: "1",
            position: "relative"
          }}
        >
          <p
            style={{ fontSize: "14px", fontWeight: "400", marginBottom: "8px" }}
          >
            Send From
          </p>

          <img src={flag} alt="flag" style={{
            width: "20px", height: "20px", padding: '1px',
            position: 'absolute',
            top: '60px',
            left: '40px'
          }} />

          <select
            onChange={(e) => {
              setSelectedCountry(e.target.value);
            }}
            // disabled={countries?.list?.length == 0 ? true : false}
            style={{
              width: "100%",
              padding: "10px",
              paddingLeft: "50px",
              borderRadius: "5px",
              border: "1px solid #E5E7EB",
              marginBottom: "10px",
              outline: "none",
              appearance: "none",
            }}
          >

            {/* {
              countries?.list?.map((country, index) => (
                <option
                  key={index}
                  value={country.id}
                  style={{ padding: "10px" }}
                >
                  {
                    country.name.charAt(0).toUpperCase() + country.name.slice(1).toLowerCase()
                  }

                </option>
              ))
            } */}
            <option
              value={'Australia'}
              style={{ padding: "10px" }}
            >
              Australia
            </option>
          </select>

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
              <QuickTransferSkeleton />
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
              <p className="py-4 border-[1px] rounded-md mt-3 border-gray-200 font-bold text-center flex justify-center">
                AUD
                <img src={approximate} alt="" className="w-6 h-6" />
                {pendingConvertedAmount ? "..." : clickedCustomAmount ? customAmount == 0 ? 0 : convertedAmountInfo?.convertedAmount : convertedAmountInfo?.convertedAmount}
              </p>
            </div>
            <div className="w-full">
              <p className="text-center uppercase">They Receive </p>
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
    </div >
  );
}

export default HeroSection;
