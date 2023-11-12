import React, { useRef, useState } from "react";
import "./HeroSection.css";
import verifiedtick from "../../assets/images/verifiedtick.png";
import Select from "react-select";
import stopCircle from "../../assets/images/stop-circle.png";
import tickCircle from "../../assets/images/tick-circle.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { showFailedAlert } from "../../utils/Tooast.Utils";

function HeroSection({ transfer_percentage }) {
  const [clickedCustomAmount, setClickedCustomAmount] = useState(false);
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");

  // get countries api using react query
  const { isPending: pendingCountries, error: countriesError, data: countries } = useQuery({
    queryKey: ['countries'],
    queryFn: () =>
      fetch('http://localhost:1337/api/countries')
        .then(res => res.json())
        .then(data => data?.data),
  })
  // console.log(pendingGeneralSettings)
  // console.log(generalSettingsError)
  console.log(countries)
  // get quick transfer api using react query
  const { isPending: pendingQuickTransfers, error: transfersError, data: quickTransfers } = useQuery({
    queryKey: ['quick-transfers'],
    queryFn: () =>
      fetch('http://localhost:1337/api/quick-transfers')
        .then(res => res.json())
        .then(data => data?.data),
  })
  // console.log(pendingQuickTransfers)
  // console.log(transfersError)
  console.log(quickTransfers)

  const options = [
    {
      value: "lebanon",
      label: "Lebanon",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Flag_of_Lebanon.svg/1200px-Flag_of_Lebanon.svg.png?20190109154742"

    }
  ]
  const [selectedCard, setSelectedCard] = useState(1);
  const [defaultAmount, setDefaultAmount] = useState(quickTransfers ? quickTransfers[0]?.attributes?.amount : 100);
  const [transferFee, setTransferFee] = useState(quickTransfers ? quickTransfers[0]?.attributes?.fee : 4);

  const handleCardClick = (index, amount, transferfee) => {
    setSelectedCard(index);
    setDefaultAmount(amount);
    setTransferFee(transferfee);
  };

  /////////////////////////////////////////////
  //input value take
  /////////////////////////////////////////////

  let customAmmountRef = useRef(null);

  const [selectedOption, setSelectedOption] = useState(null);

  const sentTo = "lebanon";
  const sendFrom = selectedOption?.attributes?.name;
  console.log(sendFrom)
  const handleCardButton = () => {
    let customAmount = customAmmountRef.value;
    if (clickedCustomAmount == true && customAmount == "") {
      showFailedAlert("Please enter amount");
      return;
    }
    const data = {
      sendFrom: sendFrom,
      sendTo: sentTo,
    };
    // if custom amount is clicked then take custom amount else take default amount
    if (clickedCustomAmount) {
      data.transfer_amount = Number(customAmount);
      data.transfer_fees = Number(customAmount) * Number(transfer_percentage) / 100;
      data.transfer_total = Number(customAmount) + Number(data.transfer_fees);
    } else {
      data.transfer_amount = Number(defaultAmount);
      data.transfer_fees = Number(transferFee);
      data.transfer_total = Number(defaultAmount) + Number(transferFee);
    }
    localStorage.setItem("amountData", JSON.stringify(data));
    if (data.sendFrom) {
      if (jwt) {
        navigate('/sendingMoney')
      } else {
        navigate('/register')
      }
    }else{
      showFailedAlert("Please select country to proceed")
    }

  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Left Part */}
      <div
        className="w-full md:w-1/2 flex items-center justify-center pl-5"
        style={{ height: "90vh", backgroundColor: "#EEE" }}
      >
        <div className="container-fluid">
          <p className="font-bold text-5xl sm:md:text-6xl lg:text-6xl xl:text-6xl herosectionLeftSideHeadingText">
            Fastest way to send <br /> money to Lebanon,
            <br /> instantly.
          </p>
          <p className="herosectionLeftSideNormalText">
            From security and privacy to care and accountability - <br /> what
            matters to you matters to us.
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
        className="w-full md:w-1/2 flex items-center justify-center pl-5 pr-5 md:pl-1 md:pr-1"
        style={{ height: "90vh", backgroundColor: "#EEE" }}
      >
        <div
          className="heroSectionCard shadow-xl w-full sm:w-3/3 md:w-4/5 xl:w-2/4 md:h-3/3 xl:h-3/3"
          style={{
            backgroundColor: "#FFF",
            padding: "24px",
            zIndex: "1",
          }}
        >
          <p
            style={{ fontSize: "14px", fontWeight: "400", marginBottom: "8px" }}
          >
            Send From
          </p>
          <Select
            defaultValue={selectedOption}
            options={countries}
            onChange={setSelectedOption}
            formatOptionLabel={(country) => (
              <div className="flex">
                <img
                  src={country.attributes.icon}
                  alt="country-image"
                  style={{
                    height: "24px",
                    width: "24px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
                <span>{country.attributes.name}</span>
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
            {
              pendingQuickTransfers ? <p>Loading...</p> : quickTransfers?.map((transfer, index) => (
                transfer?.attributes?.enabled == true &&
                <div
                  key={index}
                  className={`flex items-center w-1/3 gap-4 p-3 cursor-pointer ${clickedCustomAmount == false && selectedCard === index + 1 ? "bg-gray-200 rounded-xl" : ""}`}
                  onClick={() => {
                    customAmmountRef.value = "";
                    handleCardClick(index + 1, transfer?.attributes?.amount, transfer?.attributes?.fee);
                    setClickedCustomAmount(false);
                  }}
                >
                  <div>
                    <p className="heroSectionRightSideUSD">{transfer?.attributes?.amount}</p>
                    <p className="heroSectionRightSideFee">fees: {transfer?.attributes?.fee}</p>
                  </div>
                  <div>
                    {clickedCustomAmount == false && selectedCard === index + 1 ? (
                      <img src={tickCircle} alt="" />
                    ) : (
                      <img src={stopCircle} alt="" />
                    )}
                  </div>
                </div>
              ))
            }
          </div>
          {/* custom amount */}
          <input
            onClick={() => setClickedCustomAmount(true)}
            ref={(input) => (customAmmountRef = input)}
            placeholder="or custom ammount"
            className="mt-6 rounded-xl border-none text-black heroSectionCustommunt"
          />
          {
            <button
              className="heroSectionRightSideButton"
              onClick={handleCardButton}
            >{
                jwt ? "Send Money" : "Sign Up/Login to transfer"
              }

            </button>
          }
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
