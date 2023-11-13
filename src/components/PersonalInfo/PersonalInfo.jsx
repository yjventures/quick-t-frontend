import React from "react";
import { NavLink } from "react-router-dom";
import "./PersonalInfo.css";
function PersonalInfo() {
  return (
    <div
      className="card"
      style={{
        maxWidth: "2400px",
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
          <div className="flex gap-5 md:gap-5 lg:gap-20">
            <div>
              {/* style={{ position: "relative" }} */}
              <img
                src="https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg"
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

            <div>
              <div className="mb-5">
                <p className="text-xs lg:text-base font-medium">Name</p>
                <p className="text-sm lg:text-lg font-semibold mt-1">
                  Tomiwa Oyeledu
                </p>
              </div>
              <div className="mb-5">
                <p className="text-xs lg:text-base font-medium">
                  Date of Birth
                </p>
                <p className="text-sm lg:text-lg font-semibold mt-1">
                  August 27th, 1999
                </p>
              </div>
              <div className="mb-5">
                <p className="text-xs lg:text-base font-medium">Nationality</p>
                <p className="text-sm lg:text-lg font-semibold mt-1">
                  Australian
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-16 md:gap-16 lg:gap-32">
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
                <p className="text-xs lg:text-base font-medium">Address Line</p>
                <p className="text-sm lg:text-lg font-semibold mt-1">
                  No 35 Jimmy Ebi Street
                </p>
              </div>
              <div className="mb-5">
                <p className="text-xs lg:text-base font-medium">City</p>
                <p className="text-sm lg:text-lg font-semibold mt-1">Yenagoa</p>
              </div>
              <div className="mb-5">
                <p className="text-xs lg:text-base font-medium">State</p>
                <p className="text-sm lg:text-lg font-semibold mt-1">Bayelsa</p>
              </div>
              <div className="mb-5">
                <p className="text-xs lg:text-base font-medium">Country</p>
                <p className="text-sm lg:text-lg font-semibold mt-1">Nigeria</p>
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
                <p className="text-xs lg:text-base font-medium">Phone Number</p>
                <p className="text-sm lg:text-lg font-semibold mt-1">
                  09034867656
                </p>
              </div>
              <div className="mb-5 ">
                <p className="text-xs lg:text-base font-medium">Email</p>
                <p className="text-sm lg:text-lg font-semibold mt-1">
                  tomilola@me.com
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
              className="mb-10"
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
              src="data:image/jpeg;base64,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"
              alt=""
            />

            <p
              style={{ position: "absolute", bottom: "20px" }}
              className="w-4/5 flex justify-between items-center absolute start-8 lg:start-10 personalInfoVerificationPhotoText"
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
              src="data:image/jpeg;base64,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"
              alt=""
            />
            <p
              style={{ position: "absolute", bottom: "20px" }}
              className="w-4/5 flex justify-between items-center absolute start-8 lg:start-10 personalInfoVerificationPhotoText"
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
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;
