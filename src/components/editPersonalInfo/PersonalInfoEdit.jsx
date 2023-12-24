import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import { showSuccessAlert } from "../../utils/Tooast.Utils";
function PersonalInfoEdit() {
  const navigate = useNavigate();
  //////////////////////////////////
  //upload image
  /////////////////////////////////
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadImageURL, setUploadImageURL] = useState(null);
  console.log(uploadImageURL);

  const handleImageChange = async (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const imageURL = URL.createObjectURL(selectedImage);
      setUploadedImage(imageURL);
      console.log(imageURL);

      var formData = new FormData();
      formData.append("files", selectedImage, selectedImage.name);
      console.log(formData);

      try {
        const response = await axios.post(
          "https://api.quickt.com.au/api/upload/",
          formData
        );
        console.log(response.data)
        
        console.log(response.data[0].url);
        setUploadImageURL(response.data[0].url);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const handleAddImageClick = () => {
    // Trigger click on the hidden file input
    document.getElementById("fileInput").click();
  };

  //////////////////////////////////////
  //id front page
  /////////////////////////////////////
  const [uploadedFrontImage, setUploadedFrontImage] = useState(null);
  console.log(uploadedFrontImage);
  const [uploadFrontImageURL, setUploadFrontImageURL] = useState(null);
  console.log(uploadFrontImageURL);

  const handleFrontImageChange = async (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const imageURL = URL.createObjectURL(selectedImage);
      setUploadedFrontImage(imageURL);
      console.log(imageURL);

      var formData = new FormData();
      formData.append("files", selectedImage, selectedImage.name);
      console.log(formData);

      try {
        const response = await axios.post(
          "https://api.quickt.com.au/api/upload/",
          formData
        );
        console.log(response);
        console.log(response.data[0].url);
        setUploadFrontImageURL(response.data[0].url);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const handleAddFrontImageClick = () => {
    // Trigger click on the hidden file input
    document.getElementById("frontfileInput").click();
  };

  /////////////////////////////////////
  //id back upload
  ////////////////////////////////////
  const [uploadedBackImage, setUploadedBackImage] = useState(null);
  const [uploadBackImageURL, setUploadBackImageURL] = useState(null);
  console.log(uploadBackImageURL);

  const handleBackImageChange = async (event) => {
    const selectedImage = event.target.files[0];
    if (selectedImage) {
      const imageURL = URL.createObjectURL(selectedImage);
      setUploadedBackImage(imageURL);
      console.log(imageURL);

      var formData = new FormData();
      formData.append("files", selectedImage, selectedImage.name);
      console.log(formData);

      try {
        const response = await axios.post(
          "https://api.quickt.com.au/api/upload/",
          formData
        );
        console.log(response);
        console.log(response.data[0].url);
        setUploadBackImageURL(response.data[0].url);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const handleAddBackImageClick = () => {
    // Trigger click on the hidden file input
    document.getElementById("backfileInput").click();
  };

  ////////////////////////////////
  //fetch user info
  ///////////////////////////////

  const [userData, setUserData] = useState({});
  const [userKyc, setUserKyc] = useState(null);
  //   console.log(userKyc);
  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    axios
      .get(`https://api.quickt.com.au/api/users/${userId}?populate=*`)
      .then((res) => {
        console.log(res.data);
        setUserData(res.data);
        setUserKyc(res?.data?.kyc?.id);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  ////////////////////////////////////////////
  //update user info
  ///////////////////////////////////////////
  let userUserNameRef,
    userDOBRef,
    userNationalityRef,
    userStreetAddressRef,
    userCityRef,
    userCountryRef,
    userPhoneRef,
    userEmailRef = useRef();

  const handleUpdateUserInfo = () => {
    let userUserName = userUserNameRef.value;
    let userDOB = userDOBRef.value;
    let userNationality = userNationalityRef.value;
    let userStreetAddress = userStreetAddressRef.value;
    let userCity = userCityRef.value;
    let userPhone = userPhoneRef.value;
    let userEmail = userEmailRef.value;

    const userId = localStorage.getItem("user_id");
    axios
      .put(`https://api.quickt.com.au/api/users/${userId}`, {
        username: userUserName,
        dob: userDOB,
        phone: userPhone,
        email: userEmail,
        image: uploadImageURL || userData?.image,
      })
      .then((res) => {
        axios
          .put(`https://api.quickt.com.au/api/kycs/${userKyc}`, {
            data: {
              country: userNationality,
              street_address: userStreetAddress,
              city: userCity,
              id_front: uploadFrontImageURL || userData?.kyc?.id_front,
              id_back: uploadBackImageURL || userData?.kyc?.id_back,
            },
          })
          .then((res) => {
            console.log(res);
            showSuccessAlert("User Info Updated Successfully");
            navigate("/personalInfo");
          })
          .catch((err) => {
            console.log(err.message);
          });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

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
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                <img
                  src={
                    uploadedImage ||
                    `https://api.quickt.com.au` + userData?.image
                  }
                  style={{
                    width: "258px",
                    height: "280px",
                    borderRadius: "24px",
                    cursor: "pointer",
                  }}
                  onClick={handleAddImageClick}
                  alt="Add Image"
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
                  <input
                    className="editPersonalInfoInput"
                    type="text"
                    defaultValue={userData?.username}
                    ref={(input) => (userUserNameRef = input)}
                  />
                </div>
                <div className="mb-5">
                  <p className="text-xs lg:text-base font-medium">
                    Date of Birth
                  </p>
                  <input
                    className="editPersonalInfoInput"
                    type="text"
                    defaultValue={userData?.dob}
                    ref={(input) => (userDOBRef = input)}
                  />
                </div>
                <div className="mb-5">
                  <p className="text-xs lg:text-base font-medium">
                    Nationality
                  </p>
                  <input
                    className="editPersonalInfoInput"
                    type="text"
                    defaultValue={userData?.kyc?.country}
                    ref={(input) => (userNationalityRef = input)}
                  />
                </div>
              </div>
            </div>
            <div className="sm:flex-row md:flex lg:flex  md:gap-8 lg:gap-24">
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
                  <input
                    className="editPersonalInfoInput"
                    type="text"
                    defaultValue={userData?.kyc?.street_address}
                    ref={(input) => (userStreetAddressRef = input)}
                  />
                </div>
                <div className="mb-5">
                  <p className="text-xs lg:text-base font-medium">City</p>
                  <input
                    className="editPersonalInfoInput"
                    type="text"
                    defaultValue={userData?.kyc?.city}
                    ref={(input) => (userCityRef = input)}
                  />
                </div>

                <div className="mb-5">
                  <p className="text-xs lg:text-base font-medium">Country</p>
                  <input
                    className="editPersonalInfoInput"
                    type="text"
                    defaultValue={userData?.kyc?.country}
                    ref={(input) => (userCountryRef = input)}
                  />
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
                  <input
                    className="editPersonalInfoInput"
                    type="text"
                    defaultValue={userData?.phone}
                    ref={(input) => (userPhoneRef = input)}
                  />
                </div>
                <div className="mb-5 ">
                  <p className="text-xs lg:text-base font-medium">Email</p>
                  <input
                    className="editPersonalInfoInput"
                    type="text"
                    defaultValue={userData?.email}
                    ref={(input) => (userEmailRef = input)}
                  />
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
                className="mb-10 md:mt-[-100px] lg:mt-20"
                style={{
                  color: "#2F80ED",
                  fontSize: "20px",
                  fontWeight: "500",
                  position: "relative",
                }}
              >
                Submitted Documents
              </p>

              <input
                id="frontfileInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFrontImageChange}
              />
              <img
                src={
                  uploadedFrontImage ||
                  `https://api.quickt.com.au` + userData?.kyc?.id_front
                }
                className="h-52 w-80 lg:w-96 lg:h-80"
                style={{ borderRadius: "24px" }}
                onClick={handleAddFrontImageClick}
                alt="Add Image"
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
              <input
                id="backfileInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleBackImageChange}
              />
              <img
                src={
                  uploadedBackImage ||
                  `https://api.quickt.com.au` + userData?.kyc?.id_back
                }
                className="h-52 w-80 lg:w-96 lg:h-80"
                style={{ borderRadius: "24px" }}
                onClick={handleAddBackImageClick}
                alt="Add Image"
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
            <div className="flex gap-4">
              <button
                className="editPersonalInfoDoneButton"
                onClick={handleUpdateUserInfo}
              >
                Done
              </button>
              <button
                className="editPersonalInfoCancelButton"
                onClick={() => {
                  navigate("/personalInfo");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonalInfoEdit;
