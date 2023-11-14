import React, { useRef, useState } from "react";
import whiteLogo from "../../assets/images/whiteLogo.png";
import registerImage from "../../assets/images/registerImage.png";
import "./kyc.css";
import Select from "react-select";
import frontPlaceholder from "../../assets/images/frontPlaceholder.png";
import backPlaceholder from "../../assets/images/backPlaceHolder.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showFailedAlert, showSuccessAlert } from "../../utils/Tooast.Utils";
function KycPage() {
  //for the front image
  const [frontImage, setFrontImage] = useState(frontPlaceholder);
  const [strapiFrontImage, setStrapiFrontImage] = useState(null);
  console.log(frontImage);

  const handleFrontImageClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setFrontImage(event.target.result);

        const formData = new FormData();
        formData.append("files", file);

        axios
          .post("http://localhost:1337/api/upload", formData)
          .then((response) => {
            console.log("File uploaded successfully: ", response.data);
            showSuccessAlert("Image uploaded successfully");
            console.log(response.data[0].url);
            setStrapiFrontImage(response.data[0].url);
          })
          .catch((error) => {
            console.error("Error uploading file: ", error.message);
          });
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  //back image
  const [backImage, setBackImage] = useState(backPlaceholder);

  const [strapiBackImage, setStrapiBackImage] = useState(null);
  const handleBackImageClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        // Update the state for the back image, not the front image
        setBackImage(event.target.result);

        const formData = new FormData();
        formData.append("files", file);

        axios
          .post("http://localhost:1337/api/upload", formData)
          .then((response) => {
            console.log("File uploaded successfully: ", response.data);
            showSuccessAlert("Image uploaded successfully");
            console.log(response.data[0].url);
            setStrapiBackImage(response.data[0].url);
          })
          .catch((error) => {
            console.error("Error uploading file: ", error.message);
          });
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const style = {
    control: (base, state) => ({
      ...base,
      border: 0,
      boxShadow: "none",
      "&:focus": {
        border: "1px solid black",
      },
    }),
  };
  const options = [
    {
      value: "Driver's licence",
      label: "Driver's licence",
    },
    {
      value: "birth certificate",
      label: "Birth Certificate",
    },
    {
      value: "Passport",
      label: "Passport",
    },
  ];
  const [selectedOption, setSelectedOption] = useState(null);

  //////////////////////////
  //image upload
  //////////////////////////

  const [checkedTerms, setCheckedTerms] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

 
  //////////////////////////
  //onClick handler
  //////////////////////////
  let streetAddressRef = useRef(null);
  let cityRef = useRef(null);
  let countryRef = useRef(null);
  let zipCodeRef = useRef(null);

  const handleOnClickButton = async () => {
    let streetAddress = streetAddressRef.value;
    let city = cityRef.value;
    let country = countryRef.value;
    let zipCode = zipCodeRef.value;

    if (
      streetAddress === "" ||
      city === "" ||
      country === "" ||
      zipCode === ""
    ) {
      showFailedAlert("Please fill all the fields");
      setError("Please fill all the fields");
      return;
    } else if (!checkedTerms) {
      console.log(checkedTerms);
      showFailedAlert("Please agree to the terms and conditions");
      setError("Please agree to the terms and conditions");
      return;
    } else {
      const addressData = {
        street_address: streetAddress,
        city: city,
        country: country,
        zip_code: zipCode,
        id_front: strapiFrontImage,
        id_back: strapiBackImage,
        id_type: selectedOption.value,
      };
      const data = JSON.stringify();
      const response = await axios.post(
        "http://localhost:1337/api/kycs",
        {
          data: addressData,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      if (response.data.error) {
        showFailedAlert("Something went wrong, please try again");
        setError("Something went wrong, please try again");
        return;
      }
      const kycID = response?.data?.data?.id;
      // relate kyc to user
      const userResponse = await axios.put(
        `http://localhost:1337/api/users/${localStorage.getItem("user_id")}`,
        {
          kyc: kycID,
          kyc_complete: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      if (userResponse.data.error) {
        showFailedAlert("Something went wrong, please try again");
        setError("Something went wrong, please try again");
        return;
      }
      showSuccessAlert("KYC submitted successfully");
      navigate("/securityCode");
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      {/* Left Part */}

      <div
        className="w-full md:w-1/3 px-2"
        style={{ height: "120vh", backgroundColor: "#043BA0" }}
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
        className="w-full md:w-2/3 flex items-center justify-center container max-sm:my-64 p-2 mt-32"
        style={{ height: "100vh", backgroundColor: "#FFFFFF" }}
      >
        <div>
          <p className="registerHeadingText">KYC</p>
          <p className="registerNormalText">Let us know a bit about you</p>
          <div className="flex flex-col md:flex-row md:justify-between md:gap-x-32">
            <div className="md:w-1/2">
              <div className="mb-4">
                <label className="registerPagelabel">Street Addrress</label>
                <br />
                <input
                  type="text"
                  placeholder="street address"
                  className="registerPageInput"
                  ref={(input) => (streetAddressRef = input)}
                />
              </div>
              <div className="mb-4">
                <label className="registerPagelabel">City</label>
                <br />
                <input
                  type="text"
                  placeholder="City"
                  className="registerPageInput"
                  ref={(input) => (cityRef = input)}
                />
              </div>
              <div className="registerPagelabel">
                <label htmlFor="phone1">Country</label>
                <br />
                <input
                  type="text"
                  placeholder="Country"
                  className="registerPageInput"
                  ref={(input) => (countryRef = input)}
                />
              </div>
              <div>
                <label className="registerPagelabel">Zip Code</label>
                <br />
                <input
                  type="text"
                  placeholder="zip code"
                  className="registerPageInput"
                  ref={(input) => (zipCodeRef = input)}
                />
              </div>
            </div>
            <div className="md:w-1/2 mt-4 md:mt-0">
              <div className="mb-4">
                <label className="registerPagelabel">ID Type</label>
                <br />
                <Select
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                  className="mt-3 mb-6"
                  styles={style}
                />
              </div>
              <div
                className="mb-4 mt-10"
                style={{ width: "252px", height: "135px" }}
                onClick={handleFrontImageClick}
              >
                <img
                  src={frontImage}
                  alt=""
                  style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "12px",
                  }}
                />
              </div>

              <div
                className="mb-4 mt-10"
                style={{
                  width: "252px",
                  height: "135px",
                  borderRadius: "12px",
                }}
                onClick={handleBackImageClick}
              >
                <img
                  src={backImage}
                  alt=""
                  style={{ height: "100%", width: "100%" }}
                />
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="flex items-center mb-5 gap-2">
              <input
                type="checkbox"
                className="registerPageCheckBox"
                checked={checkedTerms}
                onChange={() => {
                  setCheckedTerms(!checkedTerms);
                  console.log(checkedTerms);
                }}
              />
              <label className="registerPageCheckBoxLabel">
                I agree to the Terms and Conditions
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <button
              className="registerCreateAccount sm:w-full"
              onClick={handleOnClickButton}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KycPage;
