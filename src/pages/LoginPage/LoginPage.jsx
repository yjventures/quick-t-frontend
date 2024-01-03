import React, { useRef, useState } from "react";
import whiteLogo from "../../assets/images/whiteLogo.png";
import registerImage from "../../assets/images/registerImage.png";
import imagePlaceholder from "../../assets/images/imagePlaceholder.png";
import googleLogo from "../../assets/images/googleLogo.png";
import { NavLink, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { showFailedAlert } from "../../utils/Tooast.Utils";
import { Eye, EyeOff } from "lucide-react";
function LoginPage() {
  // do not user let refresh page

  let emailRef = useRef(null);
  let passwordRef = useRef(null);
  const navigate = useNavigate();
  const handleLoginButton = async () => {
    let email = emailRef.value;
    let password = passwordRef.value;

    const userData = {
      identifier: email,
      password: password,
    };

    // Make the axios request
    const res = await axios
      .post("https://api.quickt.com.au/api/auth/local", userData)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          localStorage.setItem("jwt", response.data.jwt);
          localStorage.setItem("user_id", response.data.user.id);
          localStorage.setItem("first_name", response.data.user?.first_name);
          localStorage.setItem("last_name", response.data.user?.last_name);
          localStorage.setItem("phone", response.data.user?.phone);
          localStorage.setItem("dob", response.data.user?.dob);
          localStorage.setItem("jwt", response.data.jwt);
          if (response.data.user?.kyc_complete == false) {
            navigate("/kyc");
          } else if (localStorage.getItem("amountData")) {
            navigate("/sendingMoney");
          } else {
            navigate("/");
          }
        } else {
          showFailedAlert("Invalid Credentials");
        }
      })
      .catch((error) => {
        console.log("Error:", error);
        showFailedAlert("Invalid Credentials");
      });
  };

  //////////////////////////////////
  //show login
  /////////////////////////////////
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
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
        className="w-full md:w-2/3 flex items-center justify-center p-2"
        style={{ height: "100vh", backgroundColor: "#FFFFFF" }}
      >
        <div className="w-3/4 md:w-3/5 sm:w-2/5 lg:w-2/5">
          <p className="registerHeadingText">Login</p>
          <p className="registerNormalText">Enter Your Credential</p>
          <div className="flex flex-col md:flex-row md:justify-between md:gap-x-32">
            <div className="w-full md:w-2/2 ">
              <div className="mb-4">
                <label className="registerPagelabel">Email</label>
                <br />
                <input
                  type="email"
                  placeholder="email"
                  className="registerPageInput"
                  ref={(input) => (emailRef = input)}
                />
              </div>
              <div className="mb-4">
                <label className="registerPagelabel">Password</label>
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
                      right: "10px", 
                      top: "45%", 
                      transform: "translateY(-50%)",
                      cursor: "pointer",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center mb-5 gap-2">
            <input type="checkbox" className="registerPageCheckBox" />
            <label className="registerPageCheckBoxLabel">Remember me</label>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-col xl:flex-col gap-4 justify-center mt-10">
            <button
              className="registerCreateAccount sm:w-full md:w-full lg:w-full xl:w-full"
              onClick={handleLoginButton}
            >
              Log in
            </button>{" "}
            <button className="flex items-center justify-center gap-2 registerGoogle sm:w-full md:w-full lg:w-full xl:w-full mt-4 sm:mt-0 text-center">
              <img src={googleLogo} alt="" />
              <span>Log in with Google</span>
            </button>
          </div>
          <p className="registerLogin text-center pt-2 pb-5">
            Don’t have an account?{" "}
            <NavLink to="/register">
              <span>Sign Up</span>
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
