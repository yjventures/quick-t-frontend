import React, { useEffect, useRef, useState } from "react";
import whiteLogo from "../../assets/images/whiteLogo.png";
import registerImage from "../../assets/images/registerImage.png";
import ReactCodeInput from "react-code-input";

import securityTick from "../../assets/images/securityTick.png";
function ConfirmCode() {
  let defaultInputStyle = {
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
    textAlign: "center",
  };

  const securityCode = localStorage.getItem("securityCode");

  const [showImage, setShowImage] = useState(false);
  let securityCodeRef = useRef();

  useEffect(() => {
    const confirmSecurityCode = securityCodeRef.value;
    if (securityCode === confirmSecurityCode) {
      setShowImage(true);
    } else {
      setShowImage(false);
    }
  }, [securityCode]);

  const handleOnChange = (value) => {
    const confirmSecurityCode = value;
    if (securityCode === confirmSecurityCode) {
      setShowImage(true);
    } else {
      setShowImage(false);
    }
  };

  /////////////////////////
  // Continue Button
  /////////////////////////
  const handleContinueButton = () => {
    localStorage.removeItem("securityCode");
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
          <p className="securityCodeHeadingText">Confirm Setup Security</p>
          <p className="securityCodeNormalText">
            Enter your secure 4 digit PIN for confirmation
          </p>
          <div className="flex gap-10">
            <ReactCodeInput
              type="number"
              inputStyle={defaultInputStyle}
              fields={4}
              onChange={handleOnChange}
              ref={(input) => (securityCodeRef = input)}
            />

            {showImage && <img src={securityTick} alt="" />}
          </div>
          <br />

          <button className="securityCodeButton" onClick={handleContinueButton}>
            Continue
          </button>
          <p className="securityCodeSmallText">
            *Pin will be required for all transfers and recievers
          </p>
        </div>
      </div>
    </div>
  );
}

export default ConfirmCode;
