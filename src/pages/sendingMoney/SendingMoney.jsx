import React, { useRef, useState } from "react";
import Rectangle from "../../assets/images/Rectangle.png";
import "./sendingMoney.css";
import Headers from "../../components/Headers";
import firstStepper from "../../assets/images/firstStepper.png";
import { NavLink } from "react-router-dom";
function SendingMoney() {
  const divStyle = {
    backgroundImage: `url(${Rectangle})`,
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    minHeight: "100vh",
    paddingTop: "100px",
  };

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
      <div style={divStyle} className="">
        <img
          src={firstStepper}
          className=" mx-auto mt-10 mb-10"
          alt=""
          style={{ width: "50%", height: "50px" }}
        />
        <div className="card">
          <form className="form">
            <div className="relative flex flex-col sm:flex-row z-0 w-full mb-6 group">
              <div className="w-full sm:w-2/3">
                <p className="headTextOfSendingInfo text-base sm:text-base md:text-xl lg:text-xl xl:text-xl">
                  Who are you sending money to?
                </p>
              </div>
              <div className="w-full sm:w-1/3">
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
                <input
                  id="international-shipping-disabled"
                  type="checkbox"
                  value=""
                  className="w-4 "
                />
                <label className="transectionLabel ms-1">
                  Save this receiver
                </label>
              </div>
            </div>

            <NavLink to="/sendingMoneyInfo">
              <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleSelectChange}
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
