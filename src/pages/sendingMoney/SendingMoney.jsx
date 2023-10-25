import React, { useRef, useState } from "react";
import Rectangle from "../../assets/images/Rectangle.png";
import "./sendingMoney.css";
import Headers from "../../components/Headers";
import { NavLink } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

function SendingMoney() {
  const divStyle = {
    backgroundImage: `url(${Rectangle})`,
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    minHeight: "100vh",
    paddingTop: "100px",
  };
  const [phone, setPhone] = useState("");

  /////////////////////////////
  //for select saved contact
  /////////////////////////////
  const contactSelectRef = useRef(null);
  const receiverAreaSelectRef = useRef(null);
  const purposeSelectRef = useRef(null);

  let firstNameRef = useRef(null);
  let lastNameRef = useRef(null);
  let countryRef = useRef(null);
  let zipCodeRef = useRef(null);
  let streetAddressRef = useRef(null);
  let cityRef = useRef(null);
  let noteRef = useRef(null);

  const handleSelectChange = () => {
    const contactCelectedValue = contactSelectRef.current.value;
    const receiverAreaCelectedValue = receiverAreaSelectRef.current.value;
    const purposeCelectedValue = purposeSelectRef.current.value;

    const firstName = firstNameRef.value;
    const lastName = lastNameRef.value;
    const country = countryRef.value;
    const zipCode = zipCodeRef.value;
    const streetAddress = streetAddressRef.value;
    const city = cityRef.value;
    const note = noteRef.value;

    const receiverData = {
      firstName: firstName,
      lastName: lastName,
      contactCelectedValue: contactCelectedValue,
      receiverAreaCelectedValue: receiverAreaCelectedValue,
      purposeCelectedValue: purposeCelectedValue,
      country: country,
      zipCode: zipCode,
      streetAddress: streetAddress,
      city: city,
      note: note,
    };
    console.log(receiverData);
    localStorage.setItem("receiverData", JSON.stringify(receiverData));
  };
  return (
    <div>
      <Headers />
      <div
        style={divStyle}
        className="flex flex-col justify-cneter items-center"
      >
        <div className="w-5/6 flex flex-col mt-5 mb-5">
          <ol className="progressBar flex items-center w-full justify-center text-center xl:ps-40 md:ps-40 ps-10">
            <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-orange-200">
              <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-orange-500 shrink-0">
                <svg width="35" height="35" xmlns="http://www.w3.org/2000/svg">
                  <text
                    x="50%"
                    y="50%"
                    fill="white"
                    fontSize="16"
                    textAnchor="middle"
                    alignmentBaseline="central"
                  >
                    1
                  </text>
                </svg>
              </span>
            </li>
            <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-orange-200">
              <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-orange-300 shrink-0">
                <svg width="35" height="35" xmlns="http://www.w3.org/2000/svg">
                  <text
                    x="50%"
                    y="50%"
                    fill="white"
                    fontSize="16"
                    textAnchor="middle"
                    alignmentBaseline="central"
                  >
                    2
                  </text>
                </svg>
              </span>
            </li>
            <li className="flex items-center w-full">
              <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-orange-300 shrink-0">
                <svg width="35" height="35" xmlns="http://www.w3.org/2000/svg">
                  <text
                    x="50%"
                    y="50%"
                    fill="white"
                    fontSize="16"
                    textAnchor="middle"
                    alignmentBaseline="central"
                  >
                    3
                  </text>
                </svg>
              </span>
            </li>
          </ol>

          <ol className="mt-2 progressBar flex items-center w-full justify-center text-center xl:ps-40 md:ps-40 ps-10">
            <li className="flex w-full items-center after:content-[''] after:w-full after:inline-block text-xs ">
              <span className="text-orange-500"> Receiver Info</span>
            </li>
            <li className="flex w-full items-center after:content-[''] after:w-full after:inline-block text-xs">
              Review
            </li>
            <li className="flex items-center w-full text-xs">Payment</li>
          </ol>
        </div>
        <div className="card">
          <form className="form">
            <div className="relative flex flex-col sm:flex-row z-0 w-full mb-6 group items-center">
              <div className="w-full sm:w-2/3">
                <p className="headTextOfSendingInfo text-base sm:text-base md:text-xl lg:text-xl xl:text-xl">
                  Who are you sending money to?
                </p>
              </div>
              <div className="w-full sm:w-2/4">
                <select
                  id="countries"
                  className="sendingInputField w-full"
                  ref={contactSelectRef}
                >
                  <option selected>Select saved contact</option>
                  <option value="United States">United States</option>
                  <option value="Canada">Canada</option>
                  <option value="France">France</option>
                  <option value="Germany">Germany</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="z-0 w-full">
                <p className="transectionLabel">First name</p>
                <input
                  type="text"
                  className="w-full mb-2 sendingInputField"
                  ref={(input) => (firstNameRef = input)}
                />
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <label className="transectionLabel">Last name</label>
                <input
                  type="text"
                  className="block w-full sendingInputField"
                  ref={(input) => (lastNameRef = input)}
                />
              </div>
            </div>
            <div className="relative w-full mb-6 group">
              <label className="transectionLabel">Phone Number</label> <br />
              <PhoneInput
                country={"eg"}
                enableSearch={true}
                value={phone}
                onChange={(phone) => setPhone(phone)}
              />
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="z-0 w-full mb-6 group">
                <label className="transectionLabel">Country</label>
                <input
                  type="text"
                  className="block w-full sendingInputField"
                  ref={(input) => (countryRef = input)}
                />
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <label className="transectionLabel">Zip Code</label>
                <input
                  type="text"
                  className="block w-full sendingInputField"
                  ref={(input) => (zipCodeRef = input)}
                />
              </div>
            </div>
            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="z-0 w-full mb-6 group">
                <label className="transectionLabel">Street Address</label>
                <input
                  type="text"
                  className="block w-full sendingInputField"
                  ref={(input) => (streetAddressRef = input)}
                />
              </div>
              <div className="relative z-0 w-full mb-6 group">
                <label className="transectionLabel">City</label>
                <input
                  type="text"
                  className="block w-full sendingInputField"
                  ref={(input) => (cityRef = input)}
                />
              </div>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label className="transectionLabel">Select Reciever’s Area</label>{" "}
              <br />
              <select
                id="countries"
                className="block w-full sendingInputField"
                ref={receiverAreaSelectRef}
              >
                <option selected>Select Reciever’s Area</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
              </select>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label className="transectionLabel">Purpose for Transfer</label>
              <br />
              <select
                id="countries"
                className="block w-full sendingInputField"
                ref={purposeSelectRef}
              >
                <option selected>Choose a Area</option>
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="FR">France</option>
                <option value="DE">Germany</option>
              </select>
            </div>

            <div className="relative z-0 w-full mb-6 group">
              <label className="transectionLabel">Note (Optional)</label>
              <br />
              <textarea
                id="message"
                rows="4"
                className="block w-full sendingInputField"
                placeholder="Leave a comment..."
                ref={(input) => (noteRef = input)}
              ></textarea>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <div className="flex items-center">
                <input type="checkbox" value="" className="w-4" />
                <label className="transectionLabel ms-1">
                  Save this receiver
                </label>
              </div>
            </div>

            <NavLink to="/sendingMoneyInfo">
              <button
                className="w-full pt-2 pb-2 ps-5 pe-5 rounded-xl text-white mt-5"
                onClick={handleSelectChange}
                style={{ backgroundColor: "#043BA0" }}
              >
                Continue
              </button>
            </NavLink>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SendingMoney;
