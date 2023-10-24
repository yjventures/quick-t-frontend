import React from "react";
import "./getStart.css";
function GetStart() {
  const jwt = localStorage.getItem("jwt");
  return (
    <div className="text-center py-12 getStartMain">
      <p className="getStartHeadingText text-4xl md:text-5xl lg:text-5xl xl:text-5xl font-bold pl-5 pr-5">
        Getting started is easy.
      </p>
      <p className="getStartSecondHeadingText text-xl md:text-3xl xl:text-3xl lg:text-3xl font-semibold mt-2 ">
        Try a transfer below
      </p>
      <p className="getStartNormalText text-sm md:text-lg sm:text-sm lg:text-lg xl:text-lg">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        <br /> Suspendisse sodales interdum sapien non pretium.
      </p>
      {jwt ? (
        <button className="getStartButton">Start Transfering</button>
      ) : (
        <button className="getStartButton">try for free</button>
      )}
    </div>
  );
}

export default GetStart;
