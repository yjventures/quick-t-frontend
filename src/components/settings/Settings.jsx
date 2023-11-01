import React, { Fragment, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import "./settings.css";
import logo from "../../assets/images/logo.png";
const Settings = (props) => {
  let contentRef,
    sideNavRef = useRef();

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [username, setUserName] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    const userInfoString = localStorage.getItem("userInfo");
    if (userInfoString) {
      const userInfo = JSON.parse(userInfoString);
      setUserName(userInfo.username);
      setImageURL(userInfo.imageURL);
    }
  }, []);
  console.log(username);
  console.log(imageURL);

  const [active, setActive] = useState(null);

  function toggleDropdown() {
    var dropdownContent = document.querySelector(".sub-options");
    if (
      dropdownContent.style.display === "none" ||
      dropdownContent.style.display === ""
    ) {
      dropdownContent.style.display = "block";
    } else {
      dropdownContent.style.display = "none";
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    toggleDropdown(); // Add the toggleDropdown function here
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const setLineActive = (lineNumber) => {
    const line1 = document.querySelector(".line1");
    const line2 = document.querySelector(".line2");

    if (lineNumber === 1) {
      line1.classList.add("active-line1");
      line2.classList.remove("active-line2");
    } else if (lineNumber === 2) {
      line1.classList.remove("active-line1");
      line2.classList.add("active-line2");
    }
  };

  const handleProfileClick = () => {
    toggleDropdown();
    setActive("Profile");
  };

  const handleTransactionClick = () => {
    setActive("transaction");
    setLineActive(1);
  };

  const handlePersonalInfoClick = () => {
    setActive("PersonalInfo");
    setLineActive(2);
  };

  const handleLiveChatClick = () => {
    setActive("Live Chat");
    setLineActive(1);
  };

  const MenuBarClickHandler = () => {
    let sideNav = sideNavRef;
    let content = contentRef;
    if (sideNav.classList.contains("side-nav-open")) {
      sideNav.classList.add("side-nav-close");
      sideNav.classList.remove("side-nav-open");
      content.classList.add("content-expand");
      content.classList.remove("content");
    } else {
      sideNav.classList.remove("side-nav-close");
      sideNav.classList.add("side-nav-open");
      content.classList.remove("content-expand");
      content.classList.add("content");
    }
  };
  return (
    <div className="">
      <div className="fixed top-0 left-0  z-10">
        <div className="flex items-center">
          <a className="icon-nav h-5" onClick={MenuBarClickHandler}>
            <svg width="120" height="30" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15" cy="15" r="5" fill="black" />
              <circle cx="30" cy="15" r="5" fill="black" />
              <circle cx="45" cy="15" r="5" fill="black" />
            </svg>
          </a>
        </div>
      </div>
      <div
        ref={(div) => {
          sideNavRef = div;
        }}
        className="side-nav-open z-0"
      >
        <img
          className="nav-logo mx-2"
          style={{ marginTop: "5px" }}
          src={logo}
          alt="logo"
        />
        <div className="mt-20">
          <div className="mb-2">
            <a href="#" onClick={handleProfileClick}>
              {active === "Profile" ? (
                <button
                  className={`settingProfileButton flex justify-between ${
                    active === "Profile" ? "active" : ""
                  }`}
                >
                  <div className="flex gap-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.9" clip-path="url(#clip0_514_873)">
                        <path
                          d="M6.81154 6.11106C6.81154 4.34905 8.23842 2.92217 10.0004 2.92217C11.7624 2.92217 13.1893 4.34905 13.1893 6.11106C13.1893 7.87307 11.7624 9.29995 10.0004 9.29995C8.23842 9.29995 6.81154 7.87307 6.81154 6.11106ZM2.92266 14.8611C2.92266 14.4716 3.11218 14.0787 3.54765 13.6768C3.98788 13.2705 4.63116 12.904 5.39842 12.5966C6.93407 11.9814 8.79002 11.6722 10.0004 11.6722C11.2108 11.6722 13.0668 11.9814 14.6024 12.5966C15.3697 12.904 16.013 13.2705 16.4532 13.6768C16.8887 14.0787 17.0782 14.4716 17.0782 14.8611V17.0777H2.92266V14.8611Z"
                          stroke="#2F80ED"
                          stroke-width="1.4"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_514_873">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <p>Profile</p>
                  </div>

                  <div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.59 7.41L13.17 12L8.59 16.59L10 18L16 12L10 6L8.59 7.41Z"
                        fill="#2F80ED"
                      />
                    </svg>
                  </div>
                </button>
              ) : (
                <button
                  className={`settingProfileButton flex justify-between ${
                    active === "Profile" ? "active" : ""
                  }`}
                >
                  <div className="flex gap-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g opacity="0.9" clip-path="url(#clip0_514_873)">
                        <path
                          d="M6.81154 6.11106C6.81154 4.34905 8.23842 2.92217 10.0004 2.92217C11.7624 2.92217 13.1893 4.34905 13.1893 6.11106C13.1893 7.87307 11.7624 9.29995 10.0004 9.29995C8.23842 9.29995 6.81154 7.87307 6.81154 6.11106ZM2.92266 14.8611C2.92266 14.4716 3.11218 14.0787 3.54765 13.6768C3.98788 13.2705 4.63116 12.904 5.39842 12.5966C6.93407 11.9814 8.79002 11.6722 10.0004 11.6722C11.2108 11.6722 13.0668 11.9814 14.6024 12.5966C15.3697 12.904 16.013 13.2705 16.4532 13.6768C16.8887 14.0787 17.0782 14.4716 17.0782 14.8611V17.0777H2.92266V14.8611Z"
                          stroke="gray"
                          stroke-width="1.4"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_514_873">
                          <rect width="20" height="20" fill="gray" />
                        </clipPath>
                      </defs>
                    </svg>
                    <p>Profile</p>
                  </div>

                  <div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.59 7.41L13.17 12L8.59 16.59L10 18L16 12L10 6L8.59 7.41Z"
                        fill="gray"
                      />
                    </svg>
                  </div>
                </button>
              )}
            </a>
            <div className="dropdown-content sub-options flex flex-col">
              <div>
                <NavLink to="" onClick={handleTransactionClick}>
                  <button
                    className={`${
                      active === "transaction"
                        ? "subSettingMenuItem mt-2 mb-2"
                        : "mt-2 mb-2"
                    }`}
                  >
                    Transaction History
                  </button>
                </NavLink>
              </div>
              <div>
                <NavLink to="" onClick={handlePersonalInfoClick}>
                  <button
                    className={`${
                      active === "PersonalInfo"
                        ? "subSettingMenuItem mt-2 mb-2"
                        : "mt-2 mb-2"
                    }`}
                  >
                    Personal Information
                  </button>
                </NavLink>
              </div>
              <div className="line-container">
                <div className="line1"></div>
                <div className="line2"></div>
              </div>
            </div>
          </div>
          <div className="">
            <NavLink to="" onClick={handleLiveChatClick}>
              <button
                className={`settingProfileButton flex justify-between ${
                  active === "Live Chat" ? "active" : ""
                }`}
              >
                <div className="flex gap-2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.7" clip-path="url(#clip0_514_864)">
                      <path
                        d="M4.99935 14.3H4.7094L4.50437 14.505L2.36602 16.6433V3.33329C2.36602 2.80323 2.80261 2.36663 3.33268 2.36663H16.666C17.1961 2.36663 17.6327 2.80323 17.6327 3.33329V13.3333C17.6327 13.8634 17.1961 14.3 16.666 14.3H4.99935Z"
                        stroke="#333333"
                        stroke-width="1.4"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_514_864">
                        <rect width="20" height="20" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <p>Live Chat</p>
                </div>
              </button>
            </NavLink>
          </div>
        </div>
      </div>

      <div
        ref={(div) => (contentRef = div)}
        className="w-4/4 bg-white h-screen"
      >
        {props.children}
      </div>
    </div>
  );
};

export default Settings;
