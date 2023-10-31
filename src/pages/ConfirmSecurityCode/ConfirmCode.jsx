import React, { useEffect, useRef, useState } from "react";
import whiteLogo from "../../assets/images/whiteLogo.png";
import registerImage from "../../assets/images/registerImage.png";
import ReactCodeInput from "react-code-input";

import securityTick from "../../assets/images/securityTick.png";
import { NavLink } from "react-router-dom";
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
          <div className="flex flex-row items-center justify-between">
            <div>
              <ReactCodeInput
                
                inputStyle={defaultInputStyle}
                fields={4}
                onChange={handleOnChange}
                ref={(input) => (securityCodeRef = input)}
              />
            </div>

            <div>
              {showImage ? (
                <svg
                  width="47"
                  height="46"
                  viewBox="0 0 47 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.5597 0C10.1011 0 0 10.2983 0 23C0 35.7017 10.1011 46 22.5597 46C35.0184 46 45.1195 35.7017 45.1195 23C45.1195 18.8229 44.0103 14.9177 42.1012 11.5412L20.9552 33.0962C20.6036 33.4546 20.126 33.6577 19.626 33.6577C19.1278 33.6577 18.6483 33.4565 18.2967 33.0962L9.92497 24.561C9.18989 23.8116 9.18989 22.6002 9.92497 21.8507C10.66 21.1013 11.8483 21.1013 12.5834 21.8507L19.626 29.0308L39.9312 8.32926C35.7934 3.24051 29.5495 0 22.5597 0ZM39.9312 8.32926C40.7427 9.32704 41.4606 10.4076 42.1012 11.5374L46.4487 7.10514C47.1838 6.35381 47.1838 5.14427 46.4487 4.39486C45.7136 3.64544 44.5254 3.64544 43.7903 4.39486L39.9312 8.32926Z"
                    fill="#048766"
                  />
                </svg>
              ) : (
                <svg
                  width="47"
                  height="46"
                  viewBox="0 0 47 46"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="23.5" cy="23" r="22" fill="#FF5A5A" />
                  <line
                    x1="13"
                    y1="13"
                    x2="34"
                    y2="34"
                    stroke="white"
                    strokeWidth="6"
                  />
                  <line
                    x1="13"
                    y1="34"
                    x2="34"
                    y2="13"
                    stroke="white"
                    strokeWidth="6"
                  />
                </svg>
              )}
            </div>
          </div>
          <br />

          {showImage ? (
            <NavLink to="/">
              <button
                className="securityCodeButton"
                onClick={handleContinueButton}
              >
                Continue
              </button>
            </NavLink>
          ) : (
            <NavLink to="/">
              <button className="securityCodeButton" disabled>
                Continue
              </button>
            </NavLink>
          )}
          <p className="securityCodeSmallText">
            *Pin will be required for all transfers and recievers
          </p>
        </div>
      </div>
    </div>
  );
}

export default ConfirmCode;
