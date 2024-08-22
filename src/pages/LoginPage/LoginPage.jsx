import React, { useRef, useState } from "react";
import logo from "../../assets/images/logo.png";
import registerImage from "../../assets/images/registerImage.png";
import imagePlaceholder from "../../assets/images/imagePlaceholder.png";
import googleLogo from "../../assets/images/googleLogo.png";
import { NavLink, redirect, useNavigate } from "react-router-dom";
import axios from "axios";
import { showFailedAlert } from "../../utils/Tooast.Utils";
import { ArrowRightIcon, DownloadCloud, Eye, EyeOff, Share2, ShareIcon } from "lucide-react";
import Reaptcha from 'reaptcha';

function LoginPage() {
  // do not user let refresh page
  const [loading, setLoading] = useState(false);
  let emailRef = useRef(null);
  let passwordRef = useRef(null);
  const navigate = useNavigate();
  const [captchaToken, setCaptchaToken] = useState(null);
  const captchaRef = useRef(null);
  // console.log(captchaToken)
  const verify = () => {
    captchaRef.current.getResponse().then(res => {
      setCaptchaToken(res)
    })

  }

  const handleLoginButton = async () => {
    setLoading(true);
    let email = emailRef.value;
    let password = passwordRef.value;

    if (email === '' || password === '') {
      showFailedAlert("Please provide email and password");
      setLoading(false);
      return;
    }

    if(!captchaToken) {
      showFailedAlert('Please verify captcha')
      setLoading(false);
      return;
    }

    const userData = {
      identifier: email,
      password: password,
    };

    // Make the axios request
    const res = await axios
      .post("https://api.quickt.com.au/api/auth/local", userData)
      .then((response) => {
        // console.log(response.data);
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
      }).finally(() => {
        setLoading(false);
        setCaptchaToken(null);
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
        style={{ backgroundColor: "#043BA0" }}
      >
        <div>
          <img
            src={logo}
            alt="logo"
            style={{ width: "210px", height: "60px", objectFit: "cover", cursor: 'pointer' }}
            onClick={() => {
              navigate("/");
            }}
          />
        </div>
        <p className="text-center mt-10 registerLeftSideText">
          Send money to Lebanon, anytime, instantly
        </p>
        <div className="flex items-center justify-center text-center">
          <img src={registerImage} alt="logo" />
        </div>
      </div>

      {/* Right Part */}
      <div
        className="w-full md:w-2/3 flex items-center justify-center p-2"
        style={{ height: "100vh", backgroundColor: "#FFFFFF" }}
      >
        <div className="w-3/4 md:w-3/5 sm:w-2/5 lg:w-2/5 mt-20 sm:mt-4">
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

          {/* <div className="flex items-center mb-5 gap-2">
            <input type="checkbox" className="registerPageCheckBox" />
            <label className="registerPageCheckBoxLabel">Remember me</label>
          </div> */}
          
          {/* recaptcha */}
          <Reaptcha
            sitekey='6LfzkywqAAAAAJ54zYCrS2L-NocUt7SIkZogkvel'
            ref={captchaRef}
            onVerify={verify}
          />

          <div className="flex flex-col sm:flex-row md:flex-col lg:flex-col xl:flex-col gap-4 justify-center mt-10">
            <button
              className="registerCreateAccount sm:w-full md:w-full lg:w-full xl:w-full"
              onClick={handleLoginButton}
              disabled={loading}
            >
              {loading ? "Processing..." : <span className="flex items-center justify-center gap-2">
                Log in
                <ArrowRightIcon className="h-5 text-slate-200" />
              </span>}

            </button>

            {/* <button className="flex items-center justify-center gap-2 registerGoogle sm:w-full md:w-full lg:w-full xl:w-full mt-4 sm:mt-0 text-center">
              <img src={googleLogo} alt="" />
              <span>Log in with Google</span>
            </button> */}
          </div>
          <p className="registerLogin text-center pt-2 pb-5">
            Don’t have an account?
            <NavLink to="/register" className='font-bold ms-2'>
              Sign Up
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
