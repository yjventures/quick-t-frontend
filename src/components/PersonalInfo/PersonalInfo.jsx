import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./PersonalInfo.css";
import axios from "axios";
function PersonalInfo() {
  const [userData, setUserData] = useState({});
  const userEmail = userData?.email;

  const croppedEmail = userEmail
    ? userEmail.length > 15
      ? userEmail.substring(0, 15) + "..."
      : userEmail
    : "";
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    axios
      .get(`http://localhost:1337/api/users/${userId}?populate=*`)
      .then((res) => {
        // console.log(res.data);
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err.message);

      });
  }, []);
  return (
    <div
      style={{
        background: "#F5F5F5",
        paddingTop: "50px",
        paddingBottom: "50px",
      }}
    >
      <div
        className="cardPersonalInfo"
        style={{
          maxWidth: "1400px",
          backgroundColor: "#fff",
        }}
      >
        <div className="flex flex-col lg:flex-row md:flex-row justify-around">
          <div>
            <NavLink to="/" className="flex items-center gap-3">
              <div>
                <svg
                  width="18"
                  height="13"
                  viewBox="0 0 18 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 5.5H3.83L7.41 1.91L6 0.5L0 6.5L6 12.5L7.41 11.08L3.83 7.5H18V5.5Z"
                    fill="#333333"
                  />
                </svg>
              </div>
              <p style={{ fontSize: "15px" }}>Back to home</p>
            </NavLink>
            <p
              className="mb-10 mt-10"
              style={{
                color: "#2F80ED",
                fontSize: "20px",
                fontWeight: "500",
              }}
            >
              Personal Details
            </p>
            <div className="sm:flex-row md:flex lg:flex gap-5 md:gap-5 lg:gap-20">
              <div>
                {/* style={{ position: "relative" }} */}
                <img
                  src={`https://api.quickt.com.au` + userData?.image}
                  alt=""
                  style={{
                    borderRadius: "24px",
                    height: "280px",
                    width: "258px",
                    objectFit: "cover",
                  }}
                />
                {/* <p
                style={{ position: "absolute", bottom: "20px" }}
                className="absolute start-3 lg:start-12 personalInfoVerificationPhotoText"
              >
                Verification Photo
              </p> */}
              </div>

              <div className="mt-10 md:mt-0 lg:mt-0">
                <div className="mb-5">
                  <p className="text-xs lg:text-base font-medium">Name</p>
                  <p className="text-sm lg:text-lg font-semibold mt-1">
                    {userData?.username}
                  </p>
                </div>
                <div className="mb-5">
                  <p className="text-xs lg:text-base font-medium">
                    Date of Birth
                  </p>
                  <p className="text-sm lg:text-lg font-semibold mt-1">
                    {userData?.dob}
                  </p>
                </div>
                <div className="mb-5">
                  <p className="text-xs lg:text-base font-medium">
                    Nationality
                  </p>
                  <p className="text-sm lg:text-lg font-semibold mt-1">
                    {userData?.kyc?.country}
                  </p>
                </div>
              </div>
            </div>
            <div className="sm:flex-row md:flex lg:flex  md:gap-28 lg:gap-56">
              <div>
                <p
                  className="mb-10 mt-9"
                  style={{
                    color: "#2F80ED",
                    fontSize: "20px",
                    fontWeight: "500",
                  }}
                >
                  Address
                </p>
                <div className="mb-5 mt-5">
                  <p className="text-xs lg:text-base font-medium">
                    Address Line
                  </p>
                  <p className="text-sm lg:text-lg font-semibold mt-1">
                    {userData?.kyc?.street_address}
                  </p>
                </div>
                <div className="mb-5">
                  <p className="text-xs lg:text-base font-medium">City</p>
                  <p className="text-sm lg:text-lg font-semibold mt-1">
                    {userData?.kyc?.city}
                  </p>
                </div>

                <div className="mb-5">
                  <p className="text-xs lg:text-base font-medium">Country</p>
                  <p className="text-sm lg:text-lg font-semibold mt-1">
                    {userData?.kyc?.country}
                  </p>
                </div>
              </div>
              <div>
                <p
                  className="mb-10 mt-9"
                  style={{
                    color: "#2F80ED",
                    fontSize: "20px",
                    fontWeight: "500",
                  }}
                >
                  Contact Details
                </p>
                <div className="mb-5 mt-5">
                  <p className="text-xs lg:text-base font-medium">
                    Phone Number
                  </p>
                  <p className="text-sm lg:text-lg font-semibold mt-1">
                    {userData?.phone}
                  </p>
                </div>
                <div className="mb-5 ">
                  <p className="text-xs lg:text-base font-medium">Email</p>
                  <p className="text-sm lg:text-lg font-semibold mt-1">
                    {croppedEmail}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center gap-y-4">
            <div
              style={{
                position: "relative",
              }}
            >
              <p
                className="mb-10 md:mt-[-15px] lg:mt-20"
                style={{
                  color: "#2F80ED",
                  fontSize: "20px",
                  fontWeight: "500",
                  position: "relative",
                }}
              >
                Submitted Documents
              </p>

              <img
                className="h-52 w-80 lg:w-96 lg:h-80"
                style={{ borderRadius: "24px", objectFit: "cover" }}
                src={`https://api.quickt.com.au` + userData?.kyc?.id_front}
                alt=""
              />

              <p
                style={{ position: "absolute", bottom: "20px" }}
                className="w-4/5 flex justify-between items-center absolute start-4 lg:start-10 personalInfoVerificationPhotoText"
              >
                <p>ID Front</p>
                <p
                  className="px-2"
                  style={{ border: "1px solid black", borderRadius: "16px" }}
                >
                  1 File
                </p>
              </p>
            </div>
            <div style={{ position: "relative" }}>
              <img
                className="h-52 w-80 lg:w-96 lg:h-80"
                style={{ borderRadius: "24px", objectFit: "cover" }}
                src={`https://api.quickt.com.au` + userData?.kyc?.id_back}
                alt=""
              />
              <p
                style={{ position: "absolute", bottom: "20px" }}
                className="w-4/5 flex justify-between items-center absolute start-4 lg:start-10 personalInfoVerificationPhotoText"
              >
                <p>ID Back</p>
                <p
                  className="px-2"
                  style={{ border: "1px solid black", borderRadius: "16px" }}
                >
                  1 File
                </p>
              </p>
            </div>
            <NavLink to="/editPersonalInfo">
              <p className="text-sky-400 cursor-pointer">
                Edit Personal Information
              </p>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;
