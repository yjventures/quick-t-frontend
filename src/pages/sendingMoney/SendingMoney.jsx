import React, { useEffect, useRef, useState } from "react";
import Rectangle from "../../assets/images/Rectangle.png";
import "./sendingMoney.css";
import Headers from "../../components/Headers";
import { NavLink, useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { useQuery, QueryClient, useQueryClient } from "@tanstack/react-query";
import { showFailedAlert } from "../../utils/Tooast.Utils";

function SendingMoney() {
  const navigate = useNavigate();
  const divStyle = {
    backgroundImage: `url(${Rectangle})`,
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
    minHeight: "100vh",
    paddingTop: "20px",
  };
  const [phone, setPhone] = useState("");

  const fetchReceivers = async () => {
    const user_id = localStorage.getItem("user_id");
    const res = await fetch(
      `http://localhost:1337/api/saved-receivers?filters[users_permissions_user][id][$eq]=${user_id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      }
    );
    const data = await res.json();
    return data?.data;
  };

  const {
    isPending: pendingReceiver,
    error: receiverstError,
    data: receivers,
  } = useQuery({
    queryKey: ["receivers"],
    queryFn: fetchReceivers,
  });

  const fetchAreas = async () => {
    const res = await fetch(`http://localhost:1337/api/areas`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    const data = await res.json();
    return data?.data;
  };

  const {
    isPending: pendingAreas,
    error: areasError,
    data: areas,
  } = useQuery({
    queryKey: ["areas"],
    queryFn: fetchAreas,
  });

  // console.log(areas)
  // console.log(pendingReceiver)
  // console.log(receivers)
  // console.log(receiverstError)
  /////////////////////////////
  //for select saved contact
  /////////////////////////////
  const contactSelectRef = useRef(null);
  const receiverAreaSelectRef = useRef(null);
  // const purposeSelectRef = useRef(null);

  let firstNameRef = useRef(null);
  let lastNameRef = useRef(null);
  let countryRef = useRef(null);
  let zipCodeRef = useRef(null);
  let streetAddressRef = useRef(null);
  let cityRef = useRef(null);
  let noteRef = useRef(null);
  let purposeRef = useRef(null);
  // let transectionPasswordRef = useRef(null);
  const [transactionPassword, setTransactionPassword] = useState("");
  const [selectedContact, setSelectedContact] = useState(false);
  // Function to generate a random password
  const generateTransactionPassword = () => {
    // Example: Generate a random 8-character password with alphanumeric characters
    const length = 8;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  };

  // Use useEffect to set the initial transaction password when the component mounts
  useEffect(() => {
    setTransactionPassword(generateTransactionPassword());
  }, []);

  const showData = () => {
    const contactCelectedId = contactSelectRef.current.value;
    if (contactCelectedId == "Select saved contact") {
      setSelectedContact(false);
      // make all fields empty
      firstNameRef.value = "";
      lastNameRef.value = "";
      countryRef.value = "";
      zipCodeRef.value = "";
      streetAddressRef.value = "";
      cityRef.value = "";
      setPhone("");
      return;
    } else {
      setSelectedContact(true);
    }
    const selectedReceiver = receivers.find(
      (receiver) => Number(receiver.id) === Number(contactCelectedId)
    );
    // console.log(selectedReceiver)
    if (selectedReceiver) {
      const {
        first_name,
        last_name,
        phone,
        country,
        zip_code,
        street_address,
        city,
      } = selectedReceiver.attributes;
      // console.log(selectedReceiver.attributes)
      firstNameRef.value = first_name;
      lastNameRef.value = last_name;
      countryRef.value = country;
      zipCodeRef.value = zip_code;
      streetAddressRef.value = street_address;
      cityRef.value = city;
      setPhone(phone);
    }
  };

  // get user details
  const { isPending: pendingUser, error: userError, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      fetch("http://localhost:1337/api/users/me", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
        .then((res) => res.json())
  });
  if (userError) return showFailedAlert("Something went wrong");

  // console.log(user)
  const handleSelectChange = async () => {
    // get user details form query key "user"
    // console.log(user)
    if (user.kyc_approved == false || user.kyc_approved == null) {
      showFailedAlert("KYC need to be approved to proceed with the transaction.")
      return;
    }

    const contactSelectedValue = contactSelectRef.current.value;
    const receiverAreaSelectedValue = receiverAreaSelectRef.current.value;
    // const purposeCelectedValue = purposeSelectRef.current.value;
    console.log(contactSelectedValue, receiverAreaSelectedValue);
    const firstName = firstNameRef.value;
    const lastName = lastNameRef.value;
    const country = countryRef.value;
    const zipCode = zipCodeRef.value;
    const streetAddress = streetAddressRef.value;
    const city = cityRef.value;
    const note = noteRef.value;
    const purpose = purposeRef.value;
    // const transectionPassword = transectionPasswordRef.value;
    if (
      !contactSelectedValue ||
      !receiverAreaSelectedValue ||
      receiverAreaSelectedValue == "Select Reciever’s Area" ||
      !firstName ||
      !lastName ||
      !country ||
      !zipCode ||
      !streetAddress ||
      !city ||
      !purpose ||
      !transactionPassword
    ) {
      showFailedAlert("Please fill all the fields correctly");
      return;
    }
    const receiverData = {
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      country: country,
      zip_code: Number(zipCode),
      street_address: streetAddress,
      city: city,
      receiverAreaSelectedValue: receiverAreaSelectedValue,
      purpose: purpose,
      note: note,
      // transection_password: transactionPassword,
    };
    // console.log(receiverData);
    localStorage.setItem("receiverData", JSON.stringify(receiverData));
    // save this receiver
    if (!selectedContact) {
      const saveReceiver = async () => {
        const user_id = localStorage.getItem("user_id");
        const res = await fetch(`http://localhost:1337/api/saved-receivers`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          body: JSON.stringify({
            data: {
              first_name: firstName,
              last_name: lastName,
              phone: phone,
              country: country,
              zip_code: Number(zipCode),
              street_address: streetAddress,
              city: city,
              area: receiverAreaSelectedValue,
              users_permissions_user: user_id,
            },
          }),
        });
        const data = await res.json();
        return data;
      };
      const res = await saveReceiver();
      if (res.data) {
        navigate("/sendingMoneyInfo");
      } else {
        showFailedAlert("Something went wrong");
      }
    } else {
      navigate("/sendingMoneyInfo");
    }
  };
  return (
    <div>
      <Headers />
      <div
        style={divStyle}
        className="flex flex-col justify-cneter items-center"
      >
        <div className="w-5/6 flex flex-col mt-32 mb-5">
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
          <div className="form" onSubmit={handleSelectChange}>
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
                  onChange={showData}
                >
                  <option>Select saved contact</option>
                  {/* show saved receivers */}
                  {pendingReceiver ? (
                    <option>Loading...</option>
                  ) : (
                    receivers?.map((receiver) => {
                      // console.log(receiver)
                      const { id, attributes } = receiver;
                      return (
                        <option key={id} value={id}>
                          {attributes.first_name} {attributes.last_name}
                        </option>
                      );
                    })
                  )}
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
                country={"au"}
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
                <option>Select Reciever’s Area</option>
                {pendingAreas ? (
                  <option>Loading...</option>
                ) : (
                  areas?.map((area) => {
                    const { id, attributes } = area;
                    return (
                      <option key={id} value={id}>
                        {attributes.name}
                      </option>
                    );
                  })
                )}
              </select>
            </div>
            <div className="relative z-0 w-full mb-6 group">
              <label className="transectionLabel">Purpose for Transfer</label>
              <br />
              <textarea
                id="message"
                rows="1"
                className="block w-full sendingInputField"
                placeholder="Write the purpose for transfer..."
                ref={(input) => (purposeRef = input)}
              ></textarea>
            </div>

            {/* <div className="relative z-0 w-full mb-6 group">
              <label className="transectionLabel">Transaction Password</label>
              <br />
              <input
                type="text"
                className="block w-full sendingInputField"
                value={transactionPassword}
                onChange={(e) => setTransactionPassword(e.target.value)}
              />
            </div> */}

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
            {/* save this receiver */}
            {selectedContact === false && (
              <div className="relative z-0 w-full mb-6 group">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    onCanPlay={() => {
                      console.log("checked");
                    }}
                    className="w-4"
                  />
                  <label className="transectionLabel ms-1">
                    Save this receiver
                  </label>
                </div>
              </div>
            )}
            {/* continue button */}
            <button
              type="submit"
              onClick={handleSelectChange}
              className="w-full pt-2 pb-2 ps-5 pe-5 rounded-xl text-white mt-5"
              style={{ backgroundColor: "#043BA0" }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendingMoney;
