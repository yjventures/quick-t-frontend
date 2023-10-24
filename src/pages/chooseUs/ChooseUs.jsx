import React from "react";
import "./chooseUs.css";
function ChooseUs() {
  return (
    <div className="chooseUsMain py-10 md:py-14 lg:py-14 xl:py-14">
      <div className="text-center">
        <p className="chooseUsTextIntro ">WE HELP FOR YOU</p>
        <p className="chooseUsTextIntroHeading text-4xl md:text-5xl lg:text-5xl xl:text-5xl pt-5">
          Why Chooes Us
        </p>
      </div>
      <div className="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        <div className="rounded overflow-hidden chooseUsCard">
          <p className="chooseUsCardHeadingText">Trust Partner</p>
          <p className="chooseUsCardNormalText">
            Cloudless and of a deep dark blue the <br /> spectacle before us
            was.
          </p>
        </div>
        <div className="rounded overflow-hidden chooseUsCard">
          <p className="chooseUsCardHeadingText">Secure Processing</p>
          <p className="chooseUsCardNormalText">
            Cloudless and of a deep dark blue the spectacle before us was.
          </p>
        </div>
        <div className="rounded overflow-hidden chooseUsCard">
          <p className="chooseUsCardHeadingText">Award-Winning Team</p>
          <p className="chooseUsCardNormalText">
            Cloudless and of a deep dark blue the spectacle before us was.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChooseUs;
