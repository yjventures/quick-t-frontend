import React, { useEffect, useState } from "react";
import "./personalInfo.css";
import AddImage from "../../assets/images/addImage.png";
import axios from "axios";


function PersonalInfo() {
  const [userData, setUserData] = useState({});
  const userEmail = userData?.email;

  const croppedEmail = userEmail
    ? userEmail.length > 15
      // ? userEmail.substring(0, 3) + "..." + userEmail.substring(15, 50)
      // first 3 letter + ... + last 3 letter
      ? userEmail.substring(0, 3) + "..." + userEmail.substring(userEmail.length - 12, userEmail.length)
      : userEmail
    : "";
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    axios
      .get(`https://api.quickt.com.au/api/users/${userId}?populate=*`)
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
          // maxWidth: "1400px",
          backgroundColor: "#fff",
        }}
      >
        <div className="flex flex-col lg:flex-row md:flex-row justify-around">
          <div>
            <p
              className="mb-10"
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
                  src={userData?.image ? `https://api.quickt.com.au` + userData?.image : AddImage}
                  alt="profile"
                  className=" rounded-[40px] h-[280px] w-[280px] object-cover"
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
            <div className="sm:flex-row md:flex lg:flex md:gap-28 lg:gap-56">
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
                className="mb-10 "
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
            {/* <NavLink to="/editPersonalInfo">
              <p className="text-sky-400 cursor-pointer">
                Edit Personal Information
              </p>
            </NavLink> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;
