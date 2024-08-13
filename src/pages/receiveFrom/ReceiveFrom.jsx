import React from "react";
import "./receiveFrom.css";
import received from "../../assets/images/received.png";
import partner from "../../assets/images/partner.png";
function ReceiveFrom() {
  return (
    <div className="flex flex-col md:flex-row px-5 mb-20">
      {/* Left Part */}

      {/* hidden sm:flex md:flex lg:flex xl:flex here add for the hide image in the small device */}
      <div
        className="w-full md:w-1/2 flex items-center sm:items-start md:items-center xl:items-center lg:items-cneter justify-center "
      // style={{ height: "90vh", backgroundColor: "#FFFFFF" }}
      >
        <div>
          <img
            src={received}
            alt="image"
            className="sm:w-[580px] sm:h-[570px] object-cover mt-10 sm:mb-0"
          />
        </div>
      </div>

      {/* Right Part */}
      <div
        className="w-full md:w-1/2 flex items-center sm:items-start md:items-center xl:items-center lg:items-cneter justify-center container px-2"
        // style={{ height: "90vh", backgroundColor: "#FFFFFF" }}
      >
        <div>
          <p className="receivedHeadingText text-4xl md:text-5xl lg:text-5xl xl:text-5xl">
            Receive money <br /> instantly in Lebanon
          </p>
          <div className="flex gap-5 mt-10">
            <div>
              <img
                src={partner}
                alt=""
                style={{ height: "48px", width: "48px" }}
              />
            </div>
            <div>
              <p className="receivedPartnerName">Whish Money</p>
              <p className="receivedPartnerOwner">Local Partner</p>
            </div>
          </div>

          <p className="receivedNormalText lg:text-2xl xl:text-2xl md:text-2xl text-lg pt-10">
            QuickT delivers the money instantly to your receiver <br /> through
            more than 600 Whish Money locations in <br /> Lebanon
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReceiveFrom;
