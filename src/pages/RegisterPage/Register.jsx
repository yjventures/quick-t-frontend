import React, { useEffect, useRef, useState } from "react";
import "./register.css";
import whiteLogo from "../../assets/images/whiteLogo.png";
import registerImage from "../../assets/images/registerImage.png";
import imagePlaceholder from "../../assets/images/imagePlaceholder.png";
import googleLogo from "../../assets/images/googleLogo.png";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
function Register() {
  const [error, setError] = useState(null);
  const [warning, setWarning] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  /////////////////////////////////////
  //photo upload handling
  /////////////////////////////////////

  const [image, setImage] = useState(imagePlaceholder);
  console.log(image);

  const handleImageClick = () => {
    // Code to handle image click and trigger file upload
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
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
  let phoneNumberRef = useRef(null);
  let passwordRef = useRef(null);
  let confirmPasswordRef = useRef(null);
  let dobRef = useRef(null);

  const registerHandler = async () => {
    let firstName = firstNameRef.value;
    let lastName = lastNameRef.value;
    let email = emailRef.value;
    let phoneNumber = phoneNumberRef.value;
    let password = passwordRef.value;
    let confirmPassword = confirmPasswordRef.value;
    let dob = dobRef.value;

    if (!firstName || !lastName || !email || !phoneNumber || !password || !confirmPassword || !dob) {
      alert('Please fill all the fields');
      setError('Please fill all the fields');
      return;
    } else if (!checkedTerms) {
      alert('Please accept the terms and conditions to proceed further');
      setError('Please accept the terms and conditions to proceed further');
      return;
    } else if (password.length < 8) {
      alert('Password must be atleast 8 characters long');
      setError('Password must be atleast 8 characters long');
      return;
    } else if (password !== confirmPassword) {
      alert('Password does not match');
      setWarning('Password does not match');
      return;
    } else {
      setLoading(true);
      const userData = {
        username: firstName + ' ' + lastName,
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        phone: phoneNumber,
        dob: dob,
      };

      // stringify the data
      const data = JSON.stringify(userData);

      fetch("http://localhost:1337/api/auth/local/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: data,
      })
        .then(response => response.json())
        .then(result => {
          // console.log(result)
          if (result.jwt) {
            localStorage.setItem('jwt', result.jwt);
            localStorage.setItem('user_id', result.user.id);
            localStorage.setItem('dob', result.user?.dob);
            localStorage.setItem('first_name',result.user?.first_name);
            localStorage.setItem('last_name',result.user?.last_name);
            localStorage.setItem('phone',result.user?.phone);
            // window.location.href = "/dashboard";
            navigate('/kyc');
          } else {
            alert(result.error.message);
            setError(result.error.message);
          }
        })
        .catch(error => {
          console.log('error', error)
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
        className="w-full md:w-2/3 flex items-center justify-center container max-sm:my-72 mt-20"
        style={{ height: "100vh", backgroundColor: "#FFFFFF" }}
      >
        <div className="mt-32">
          <p className="registerHeadingText">Create account</p>
          <p className="registerNormalText">Enter Your basic information</p>
          <div className="flex flex-col md:flex-row md:justify-between md:gap-x-14">
            <div className="md:w-1/2">
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
                <label className="registerPagelabel">Email</label>
                <br />
                <input
                  type="email"
                  placeholder="Email"
                  className="registerPageInput"
                  ref={(input) => (emailRef = input)}
                />
              </div>
              <div className="registerPagelabel">
                <label htmlFor="phone1">Password</label>
                <br />
                <input
                  type="password"
                  placeholder="Password"
                  className="registerPageInput"
                  ref={(input) => (passwordRef = input)}
                />
              </div>
              <div>
                <label className="registerPagelabel">Date of Birth</label>
                <br />
                <input
                  type="date"
                  placeholder="Date of Birth"
                  className="registerPageInput"
                  ref={(input) => (dobRef = input)}
                />
              </div>
            </div>
            <div className="md:w-1/2 mt-4 md:mt-0">
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
              <div className="mb-4">
                <label className="registerPagelabel">Phone Number</label>
                <br />
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="registerPageInput"
                  ref={(input) => (phoneNumberRef = input)}
                />
              </div>
              <div className="mb-4">
                <label className="registerPagelabel">Confirm Password</label>
                <br />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="registerPageInput"
                  ref={(input) => (confirmPasswordRef = input)}
                />
              </div>
              <div
                onClick={handleImageClick}
                style={{
                  height: "161px",
                  width: "252px",
                }}
              >
                <img
                  src={image}
                  alt=""
                  style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "10px",
                  }}
                />
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
              <input type="checkbox"
                className="registerPageCheckBox"
                checked={checkedTerms}
                onChange={() => {
                  setCheckedTerms(!checkedTerms);
                }}
              />
              <label className="registerPageCheckBoxLabel">
                I agree to the <span>Terms</span> and
                <span>Privacy Policy</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <button
              className="registerCreateAccount sm:w-full"
              onClick={registerHandler}
            >
              {
                loading ? 'Creating Account...' : 'Create Account'
              }

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
