import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./settings.css";
import logo from "../../assets/images/logo.png";
const Settings = (props) => {
  let contentRef,
    sideNavRef = useRef();
  const [activeSection, setActiveSection] = useState("");

  const dropdownRef = useRef(null);

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

  ////////////////////////////  DropDown  ////////////////////////////
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
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

        <NavLink
          className={(navData) =>
            navData.isActive
              ? "side-bar-item-active side-bar-item mt-2"
              : "side-bar-item mt-2"
          }
          to=""
          onClick={handleDropdownToggle}
          end
        >
          {({ isActive }) => (
            <React.Fragment>
              {isActive ? (
                <div className="active-icon">
                  <button className={`flex items-center`}>
                    <div className="flex gap-2">
                      <div className="pt-1">
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
                      </div>
                      <p>Profile</p>
                    </div>

                    <div className="ps-28">
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
                </div>
              ) : (
                <div className="active-icon">
                  <button className={` flex justify-between `}>
                    <div className="flex gap-2">
                      <div className="pt-1">
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
                      </div>
                      <p>Profile</p>
                    </div>

                    <div className="ps-28">
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
                </div>
              )}
            </React.Fragment>
          )}
        </NavLink>

        {isDropdownOpen && (
          <div className="ms-10" style={{ position: "relative" }}>
            <NavLink
              className={(navData) =>
                navData.isActive ? "subSettingMenuItem  mt-2" : "mt-2"
              }
              to="/transactionHistory"
              end
            >
              {({ isActive }) => (
                <React.Fragment>
                  {isActive ? (
                    <div
                      className=""
                      onClick={() => setActiveSection("transactionHistory")}
                    >
                      <button className={`flex justify-between`}>
                        <div className="flex gap-2 mt-2">
                          <p>Transaction History</p>
                        </div>
                      </button>
                    </div>
                  ) : (
                    <div className="">
                      <button className={`flex justify-between `}>
                        <div className="flex gap-2 mt-2">
                          <p>Transaction History</p>
                        </div>
                      </button>
                    </div>
                  )}
                </React.Fragment>
              )}
            </NavLink>

            <NavLink
              className={(navData) =>
                navData.isActive
                  ? "subSettingMenuItem  mt-2 active-line2"
                  : "mt-2"
              }
              to="/personalInfo"
              end
            >
              {({ isActive }) => (
                <React.Fragment>
                  {isActive ? (
                    <div
                      className="mt-2"
                      onClick={() => setActiveSection("personalInfo")}
                    >
                      <button className={`flex justify-between `}>
                        <div className="flex gap-2 ">
                          <p>Personal Information</p>
                        </div>
                      </button>
                    </div>
                  ) : (
                    <div className="active-icon">
                      <button className={`flex justify-between mt-2`}>
                        <div className="flex gap-2">
                          <p>Personal Information</p>
                        </div>
                      </button>
                    </div>
                  )}
                </React.Fragment>
              )}
            </NavLink>

            <div className="line-container">
              <div
                className={
                  activeSection === "transactionHistory"
                    ? "line1 active-line1"
                    : "line1"
                }
              ></div>
              <div
                className={
                  activeSection === "personalInfo"
                    ? "line2 active-line2"
                    : "line2"
                }
              ></div>
            </div>
          </div>
        )}

        <NavLink
          className={(navData) =>
            navData.isActive
              ? "side-bar-item-active side-bar-item mt-2"
              : "side-bar-item mt-2"
          }
          to="/transactionHistory"
          end
        >
          {({ isActive }) => (
            <React.Fragment>
              {isActive ? (
                <div className="">
                  <button
                    className={`settingProfileButton flex justify-between `}
                  >
                    <div className="flex gap-2">
                      <div className="pt-1">
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
                              stroke="#2F80ED"
                              stroke-width="1.4"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_514_864">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <p>Live Chat</p>
                    </div>
                  </button>
                </div>
              ) : (
                <div className="active-icon">
                  <button
                    className={`settingProfileButton flex justify-between`}
                  >
                    <div className="flex gap-2">
                      <div className="pt-1">
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
                      </div>
                      <p>Live Chat</p>
                    </div>
                  </button>
                </div>
              )}
            </React.Fragment>
          )}
        </NavLink>
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
