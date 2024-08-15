import React, { useEffect, useRef, useState } from "react";
import "./register.css";
import logo from "../../assets/images/logo.png";
import registerImage from "../../assets/images/registerImage.png";
import imagePlaceholder from "../../assets/images/imagePlaceholder.png";
import googleLogo from "../../assets/images/googleLogo.png";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { showFailedAlert, showSuccessAlert } from "../../utils/Tooast.Utils";
import PhoneInput from "react-phone-input-2";
import { Eye, EyeOff, ImagePlus, UserIcon } from "lucide-react";
function Register() {
  const [error, setError] = useState(null);
  const [warning, setWarning] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /////////////////////////////////////
  //password show and hide
  ////////////////////////////////////
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword((prevShowPassword) => !prevShowPassword);
  };
  /////////////////////////////////////
  //photo upload handling
  /////////////////////////////////////
  const [phone, setPhone] = useState(null);
  const [image, setImage] = useState();
  const [strapiImage, setStrapiImage] = useState(null);
  console.log(image);

  const handleImageClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);

        const formData = new FormData();
        formData.append("files", file);

        axios
          .post("https://api.quickt.com.au/api/upload", formData)
          .then((response) => {
            console.log("File uploaded successfully: ", response.data);
            showSuccessAlert("Image uploaded successfully");
            console.log(response.data[0].url);
            setStrapiImage(response.data[0].url);
          })
          .catch((error) => {
            console.error("Error uploading file: ", error.message);
          });
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  /////////////////////////////////////
  //form handling
  /////////////////////////////////////

  let firstNameRef = useRef(null);
  let lastNameRef = useRef(null);
  let emailRef = useRef(null);
  // let phoneNumberRef = useRef(null);
  let passwordRef = useRef(null);
  let confirmPasswordRef = useRef(null);
  let dobRef = useRef(null);

  const registerHandler = async () => {
    let firstName = firstNameRef.value;
    let lastName = lastNameRef.value;
    let email = emailRef.value;
    let password = passwordRef.value;
    let confirmPassword = confirmPasswordRef.value;
    let dob = dobRef.value;

    if (
      !email ||
      !firstName ||
      !lastName ||
      !phone ||
      !password ||
      !confirmPassword ||
      !dob
    ) {
      console.log(
        email,
        firstName,
        lastName,
        phone,
        password,
        confirmPassword,
        dob
      );
      showFailedAlert("Please fill all the fields");
      return;
    } else if (!checkedTerms) {
      showFailedAlert(
        "Please accept the terms and conditions to proceed further"
      );
      return;
    }
    // if dob is less than 18 years old
    else if (
      new Date(dob) >
      new Date(new Date().setFullYear(new Date().getFullYear() - 18))
    ) {
      showFailedAlert("Invalid date of birth. Must be at least 18 years old.");
      return;
    } else if (password.length < 8) {
      showFailedAlert("Password must be atleast 8 characters long");
      return;
    } else if (password !== confirmPassword) {
      showFailedAlert("Password does not match");
      return;
    } else {
      setLoading(true);
      // const currentTime = new Date().getTime()
      // const time = new Date().toLocaleTimeString();
      // console.log(time);
      const userData = {
        username: firstName + " " + lastName ,
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        phone: phone,
        dob: dob,
        image: strapiImage,
      };

      // stringify the data
      const data = JSON.stringify(userData);

      fetch("https://api.quickt.com.au/api/auth/local/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      })
        .then((response) => response.json())
        .then((result) => {
          // console.log(result)
          if (result.jwt) {
            localStorage.setItem("jwt", result.jwt);
            localStorage.setItem("user_id", result.user.id);
            localStorage.setItem("dob", result.user?.dob);
            localStorage.setItem("first_name", result.user?.first_name);
            localStorage.setItem("last_name", result.user?.last_name);
            localStorage.setItem("phone", result.user?.phone);
            // window.location.href = "/dashboard";
            navigate("/kyc");
          } else {
            showFailedAlert(result.error.message);
            setError(result.error.message);
          }
        })
        .catch((error) => {
          console.log("error", error);
        })
        .finally(() => setLoading(false));
    }
  };

  /////////////////////////////////////
  //remember me handling ( using cookie)
  /////////////////////////////////////
  ////////////////////////////////////////////////////////////////
  //for remember me

  const currentPath = window.location.href;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputClicked, setinputClicked] = useState(false);
  const [rememberMeChecked, setRememberMeChecked] = useState(false);
  const [checkedTerms, setCheckedTerms] = useState(false);

  useEffect(() => {
    const getCookie = (cookieName) => {
      const cookies = document.cookie.split("; ");
      for (const cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === cookieName) {
          return decodeURIComponent(value);
        }
      }
      return null;
    };

    const storedEmail = getCookie("email");
    const storedPassword = getCookie("password");
    const decodepassword = window.atob(storedPassword);

    if (storedEmail) {
      setEmail(storedEmail);
      setinputClicked(true);
    }
    console.log(email);

    if (storedPassword) {
      setPassword(decodepassword);
      setinputClicked(true);
    }
    console.log(password);
  }, []);

  // after integration, i will use this
  if (rememberMeChecked) {
    let hashedPassword = window.btoa(password); // Fix the variable name here
    document.cookie = `email=${email}; path=${currentPath}`;
    document.cookie = `password=${hashedPassword}; path=${currentPath}`;
  } else {
    document.cookie = `email=; path=${currentPath}`;
    document.cookie = `password=; path=${currentPath}`;
  }
  ////////////////////////////////////////////////////////////////

  // ahad please show error and warning message using react toastify
  // for now i am using alert

  return (
    <div className="flex flex-col md:flex-row">
      {/* Left Part */}
      <div
        className="w-full md:w-1/3 px-2"
        style={{ backgroundColor: "#043BA0" }}
      >
        <div>
          <img
            src={logo}
            alt="logo"
            style={{ width: "210px", height: "60px", objectFit: 'cover', cursor: 'pointer'}}
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <p className="text-center mt-10 registerLeftSideText">
          Send money to Lebanon, anytime, instantly
        </p>
        <div className="flex items-center justify-center text-center mt-10">
          <img src={registerImage} alt="" />
        </div>
      </div>

      {/* Right Part */}
      <div
        className="w-full md:w-2/3 flex items-center justify-center container px-4"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div className="mt-10">
          <p className="registerHeadingText">Create account</p>

          <p className="registerNormalText mb-6 mt-6">
            Upload your profile picture
          </p>
          <div
            onClick={handleImageClick}
            style={{
              height: "162px",
              width: "253px",
            }}
          >
            {image ? (
              <img
                src={image}
                alt=""
                style={{
                  borderRadius: "10px",
                  backgroundColor: "transparent",
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                }}
              />
            ) : (
              <div
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: "3.5px",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                  border: "1px solid #D1D1D1",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ImagePlus width={"26px"} height={"50px"} />
                <div>
                  <p style={{ fontSize: "12px" }}>
                    Click to upload your Profile Picture
                  </p>
                </div>
              </div>
            )}
          </div>
          <p className="registerNormalText mt-6">
            Enter Your basic information
          </p>
          <div>
            <div className="">
              <div className="flex flex-col lg:flex-row gap-x-10">
                <div className="mb-4">
                  <label className="registerPagelabel">First name</label>
                  <br />
                  <input
                    type="text"
                    placeholder="First Name"
                    className="registerPageInput"
                    ref={(input) => (firstNameRef = input)}
                  />
                </div>
                <div className="mb-4">
                  <label className="registerPagelabel">Last name</label>
                  <br />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="registerPageInput"
                    ref={(input) => (lastNameRef = input)}
                  />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-x-10">
                <div className="mb-4">
                  <label className="registerPagelabel">Email</label>
                  <br />
                  <input
                    type="email"
                    placeholder="Enter email"
                    className="registerPageInput"
                    ref={(input) => (emailRef = input)}
                  />
                </div>
                <div className="mb-4">
                  <label className="registerPagelabel">Date of Birth</label>
                  <br />
                  <input
                    type="date"
                    placeholder="Date of Birth"
                    className="registerdateofBirthInput"
                    style={{ width: "100%" }}
                    ref={(input) => (dobRef = input)}
                    onChange={(e) => {
                      const selectedDate = new Date(e.target.value);
                      const currentDate = new Date();
                      const minAge = 18;
                      const minAgeDate = new Date(
                        currentDate.getFullYear() - minAge,
                        currentDate.getMonth(),
                        currentDate.getDate()
                      );

                      if (selectedDate > minAgeDate) {
                        // Show warning or handle invalid date of birth
                        showFailedAlert(
                          "Invalid date of birth. Must be at least 18 years old."
                        );
                      } else {
                        // Valid date of birth
                        console.log("Valid date of birth.");
                      }
                    }}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="registerPagelabel">Phone Number</label>
                <br />
                <PhoneInput
                  country={"au"}
                  // remove israel and north korea from the list
                  excludeCountries={["il", "kp"]}
                  searchPlaceholder="Search country"
                  enableSearch={true}
                  value={phone}
                  onChange={(phone) => setPhone(phone)}
                />
              </div>
              <div className="flex flex-col lg:flex-row gap-x-10">
                <div className="registerPagelabel">
                  <label htmlFor="password">Password</label>
                  <br />
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="registerPageInput"
                      ref={(input) => (passwordRef = input)}
                    />
                    <button
                      onClick={handleTogglePassword}
                      style={{
                        position: "absolute",
                        right: "10px", // Adjust the position based on your design
                        top: "45%", // Center vertically
                        transform: "translateY(-50%)", // Center vertically
                        cursor: "pointer",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="registerPagelabel">Confirm Password</label>
                  <br />
                  <div style={{ position: "relative" }}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      className="registerPageInput"
                      ref={(input) => (confirmPasswordRef = input)}
                    />
                    <button
                      onClick={handleToggleConfirmPassword}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "45%",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                        backgroundColor: "transparent",
                        border: "none",
                      }}
                    >
                      {showConfirmPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="flex items-center mb-5 gap-2">
              <input
                type="checkbox"
                className="registerPageCheckBox"
                checked={rememberMeChecked}
                onChange={() => {
                  setRememberMeChecked(!rememberMeChecked);
                }}
              />
              <label className="registerPageCheckBoxLabel">Remember me</label>
            </div>

            <div className="flex items-center mb-5 gap-2">
              <input
                type="checkbox"
                className="registerPageCheckBox"
                checked={checkedTerms}
                onChange={() => {
                  setCheckedTerms(!checkedTerms);
                }}
              />
              <label className="registerPageCheckBoxLabel">
                I agree to the{" "}
                <NavLink to="/termsAndCondition" target="_blank">
                  <span className="cursor-pointer">
                    Terms and Privacy Policy
                  </span>
                </NavLink>
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <button
              className="registerCreateAccount sm:w-full"
              onClick={registerHandler}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

            <button className="flex items-center gap-2 registerGoogle sm:w-full mt-4 sm:mt-0">
              <img src={googleLogo} alt="" />
              <span>Sign in with Google</span>
            </button>
          </div>
          <p className="registerLogin text-center pt-2 pb-5">
            have an account?{" "}
            <NavLink to="/login">
              <span>Log In</span>
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
