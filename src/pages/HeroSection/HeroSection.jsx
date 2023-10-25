import React, { useRef, useState } from "react";
import "./HeroSection.css";
import verifiedtick from "../../assets/images/verifiedtick.png";
import Select from "react-select";
import stopCircle from "../../assets/images/stop-circle.png";
import tickCircle from "../../assets/images/tick-circle.png";
import { NavLink } from "react-router-dom";

function HeroSection() {
  const jwt = localStorage.getItem("jwt");
  const options = [
    {
      value: "chocolate",
      label: "Chocolate",
      image:
        "https://i0.wp.com/nufdiran.org/wp-content/uploads/2022/07/shir-o-khorshid-flag-1024x586-1.png?w=1024&ssl=1",
    },
    {
      value: "strawberry",
      label: "Strawberry",
      image:
        "https://i0.wp.com/nufdiran.org/wp-content/uploads/2022/07/shir-o-khorshid-flag-1024x586-1.png?w=1024&ssl=1",
    },
    {
      value: "vanilla",
      label: "Vanilla",
      image:
        "https://i0.wp.com/nufdiran.org/wp-content/uploads/2022/07/shir-o-khorshid-flag-1024x586-1.png?w=1024&ssl=1",
    },
  ];

  const [selectedCard, setSelectedCard] = useState(null);
  const [defaultAmount, setDefaultAmount] = useState(null);
  const [transferFee, setTransferFee] = useState(null);

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
  const sendFrom = selectedOption?.value;

  const handleCardButton = () => {
    let customAmount = customAmmountRef.value;
    const data = {
      sendFrom: sendFrom,
      sendTo: sentTo,
      customAmount: customAmount,
      defaultAmount: defaultAmount,
      transferFee: transferFee,
    };
    localStorage.setItem("amountData", JSON.stringify(data));
    console.log(data);
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
        className="w-full md:w-1/2 flex items-center justify-center container pl-5 pr-5 md:pl-1 md:pr-1"
        style={{ height: "90vh", backgroundColor: "#EEE" }}
      >
        <div
          className="card shadow-xl w-full sm:w-2/3 md:w-4/5 lg:w-2/4 sm:h-2/3 md:h-1/2 lg:h-3/5"
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
          <select
            id="countries"
            className="sendingInputField w-full"
            onChange={setSelectedOption}
          >
            <option selected>Select saved contact</option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="France">France</option>
            <option value="Germany">Germany</option>
          </select>
          <p className="heroSectionSendTo">Send To</p>
          <input
            disabled
            value={"Lebanon"}
            className="herosectionRightSideInput text-black"
          />
          <br />
          <p className="heroSectionQuickTransfer">Quick Transfer</p>
          <div className="flex gap-2 mt-5">
            <div
              className={`flex items-center w-1/3 gap-4 p-3 cursor-pointer ${
                selectedCard === 0 ? "bg-gray-200 rounded-xl" : ""
              }`}
              onClick={() => handleCardClick(0, 100, 4)}
            >
              <div>
                <p className="heroSectionRightSideUSD">USD 100</p>
                <p className="heroSectionRightSideFee">fees: USD 4</p>
              </div>
              <div>
                {selectedCard === 0 ? (
                  <img src={tickCircle} alt="" />
                ) : (
                  <img src={stopCircle} alt="" />
                )}
              </div>
            </div>
            <div
              className={`flex items-center w-1/3 p-3 gap-4 cursor-pointer ${
                selectedCard === 1 ? "bg-gray-200 rounded-xl" : ""
              }`}
              onClick={() => handleCardClick(1, 200, 7)}
            >
              <div>
                <p className="heroSectionRightSideUSD">USD 200</p>
                <p className="heroSectionRightSideFee">fees: USD 7</p>
              </div>
              <div>
                {selectedCard === 1 ? (
                  <img src={tickCircle} alt="" />
                ) : (
                  <img src={stopCircle} alt="" />
                )}
              </div>
            </div>
            <div
              className={`flex items-center w-1/3 p-3 gap-4 cursor-pointer ${
                selectedCard === 2 ? "bg-gray-200 rounded-xl" : ""
              }`}
              onClick={() => handleCardClick(2, 500, 13)}
            >
              <div>
                <p className="heroSectionRightSideUSD">USD 500</p>
                <p className="heroSectionRightSideFee">fees: USD 13</p>
              </div>
              <div>
                {selectedCard === 2 ? (
                  <img src={tickCircle} alt="" />
                ) : (
                  <img src={stopCircle} alt="" />
                )}
              </div>
            </div>
          </div>
          <input
            ref={(input) => (customAmmountRef = input)}
            placeholder="or custom ammount"
            className="p-4 mt-6 bg-gray-100 rounded-xl border-none text-black heroSectionCustommunt"
          />
          {jwt ? (
            <button
              className="heroSectionRightSideButton"
              onClick={handleCardButton}
            >
              Send Money
            </button>
          ) : (
            <NavLink to="/register">
              <button
                className="heroSectionRightSideButton"
                onClick={handleCardButton}
              >
                Sign Up/Login to transfer
              </button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
