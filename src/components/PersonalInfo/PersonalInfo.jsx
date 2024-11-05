import React, { useEffect, useState } from "react";
import axios from "axios";
import { Shield } from "lucide-react";

function PersonalInfo() {
  const [userData, setUserData] = useState({});
  const userEmail = userData?.email;

  const croppedEmail = userEmail
    ? userEmail.length > 15
      ? userEmail.substring(0, 3) + "..." + userEmail.substring(userEmail.length - 12, userEmail.length)
      : userEmail
    : "";

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    axios
      .get(`http://localhost:1337/api/users/${userId}?populate=*`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="bg-gray-100 p-5 min-h-screen">
      <div className=" bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Personal Information</h1>
        <hr className="mb-4" />

        <div className="flex items-center mb-4">
          <Shield className="mr-2 text-green-600" size={24} />
          <p className="text-lg font-semibold">Verification Status: {userData.kyc_approved ? 'Verified' : 'Not Verified'}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border rounded-md p-4 bg-gray-50 space-y-4">
            <h2 className="font-medium text-lg mb-2 border-b-2 pb-2">User Details</h2>
            {/* <p><strong>Username:</strong> {userData.username}</p> */}
            <p><strong>Email:</strong> {croppedEmail}</p>
            <p><strong>First Name:</strong> {userData.first_name}</p>
            <p><strong>Last Name:</strong> {userData.last_name}</p>
            <p><strong>Phone:</strong> {userData.phone}</p>
            <p><strong>Date of Birth:</strong> {userData.dob}</p>
          </div>

          <div className="border rounded-md p-4 bg-gray-50 space-y-4">
            <h2 className="font-medium text-lg mb-2 border-b-2 pb-2">Account Status</h2>
            <p><strong>Blocked:</strong> {userData.blocked ? 'Yes' : 'No'}</p>
            {/* <p><strong>Confirmed:</strong> {userData.confirmed ? 'Yes' : 'No'}</p> */}
            {/* <p><strong>KYC Complete:</strong> {userData.kyc_complete ? 'Yes' : 'No'}</p> */}
            <p><strong>KYC Approved:</strong> {userData.kyc_approved ? 'Yes' : 'No'}</p>
            <p><strong>Security Complete:</strong> {userData.security_complete ? 'Yes' : 'No'}</p>
            <p><strong>Account Created:</strong> {new Date(userData.createdAt).toLocaleDateString()}</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default PersonalInfo;
