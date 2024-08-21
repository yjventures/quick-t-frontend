import React from "react";
import "./getStart.css";
import { useNavigate } from "react-router-dom";
function GetStart({ description, second_title, title }) {
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate()
  return (
    <div className="text-center py-12 getStartMain">
      <p className="getStartHeadingText text-4xl md:text-5xl lg:text-5xl xl:text-5xl font-bold pl-5 pr-5">
        {title ? title : "Getting Started is super easy"}
      </p>
      {/* <p className="getStartSecondHeadingText text-xl md:text-3xl xl:text-3xl lg:text-3xl font-semibold mt-2 ">
        {second_title ? second_title : "Send money to Lebanon in 3 easy steps"}
      </p> */}

      {/* <p className="getStartNormalText text-sm md:text-lg sm:text-sm lg:text-lg xl:text-lg">
        {description ? description : "From security and privacy to care and accountability - what matters to you matters to us."}
      </p> */}

      <button onClick={() => {
        navigate("/login");
      }} className="getStartButton mt-6 text-black">START</button>
    </div>
  );
}

export default GetStart;
