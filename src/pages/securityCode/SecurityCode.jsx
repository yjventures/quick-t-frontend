import React, { useState } from "react";
import whiteLogo from "../../assets/images/whiteLogo.png";
import registerImage from "../../assets/images/registerImage.png";
import ReactCodeInput from "react-code-input";
import "./securityCode.css";
import securityTick from "../../assets/images/securityTick.png";
import { NavLink } from "react-router-dom";
function SecurityCode() {
  const defaultInputStyle = {
    fontFamily: "monospace",
    MozAppearance: "textfield",
    margin: "4px",
    paddingLeft: "8px",
    width: "45px",
    borderRadius: "3px",
    height: "45px",
    fontSize: "32px",
    border: "1px solid lightskyblue",
    boxSizing: "border-box",
    color: "black",
    backgroundColor: "white",
    borderColor: "lightgrey",
    WebkitAppearance: "none", // this line will hide the increment and decrement buttons
  };

  const [inputValue, setInputValue] = useState("");
  const [shouldShowImage, setShouldShowImage] = useState(true);

  const birthDate = "1999-09-28";
  const birthYear = birthDate.split("-")[0];

  const handleInputChange = (value) => {
    if (
      [
        "1111",
        "2222",
        "3333",
        "4444",
        "5555",
        "6666",
        "7777",
        "8888",
        "9999",
      ].includes(value) ||
      birthYear === value
    ) {
      setShouldShowImage(false);
    } else {
      setShouldShowImage(true);
    }
    setInputValue(value);
  };

  ////////////////////////////
  //handle on click
  ////////////////////////////
  const handleOnClick = () => {
    localStorage.setItem("securityCode", inputValue);
  };
  return (
    <div className="flex flex-col md:flex-row">
      {/* Left Part */}

      <div
        className="w-full md:w-1/3 px-2"
        style={{ height: "100vh", backgroundColor: "#043BA0" }}
      >
        <div>
          <img
            src={whiteLogo}
            alt=""
            style={{ width: "210px", height: "60px" }}
          />
        </div>
        <p className="text-center mt-32 mb-20 registerLeftSideText">
          Send money to Lebanon, anytime, instantly
        </p>
        <div className="flex items-center justify-center mt-10 text-center">
          <img src={registerImage} alt="" />
        </div>
      </div>

      {/* Right Part */}
      <div
        className="w-full md:w-2/3 flex justify-center container  mt-32"
        style={{ height: "70vh", backgroundColor: "#FFFFFF" }}
      >
        <div className="text-center">
          <p className="securityCodeHeadingText">Setup Security</p>
          <p className="securityCodeNormalText">
            Enter your secure 4 digit PIN
          </p>
          <div className="flex gap-5">
            <ReactCodeInput
              type="number"
              inputStyle={defaultInputStyle}
              fields={4}
              onChange={handleInputChange}
              value={inputValue}
            />
            {shouldShowImage && <img src={securityTick} alt="" />}
          </div>
          <br />

          <NavLink to="/confirmSecurityCode">
            <button className="securityCodeButton" onClick={handleOnClick}>
              Continue
            </button>
          </NavLink>
          <p className="securityCodeSmallText">
            *Pin will be required for all transfers and recievers
          </p>
        </div>
      </div>
    </div>
  );
}

export default SecurityCode;
