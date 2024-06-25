import React from "react";
import color from "../../assets/images/color.png";
import "./chooseUs.css";
function ChooseUs({
  service_box_one_icon,
  service_box_one_title,
  service_box_one_desc,
  service_box_two_icon,
  service_box_two_title,
  service_box_two_desc,
  service_box_three_icon,
  service_box_three_title,
  service_box_three_desc,
}) {
  return (
    <div className=" py-10 max-w-[1200px] mx-auto ">
      <div className="text-center">
        <p className="chooseUsTextIntro ">WE HELP FOR YOU</p>
        <p className="chooseUsTextIntroHeading text-4xl md:text-5xl lg:text-5xl xl:text-5xl pt-5">
          {/* look here image is showing,  */}
          Why Choose Us
        </p>
      </div>
      <div className="flex justify-around items-center flex-wrap mt-20 gap-4 px-4" >
        <div className="mt-20 flex justify-center items-center relative">
          <div>
            <div className="sm:w-[360px] w-[400px] h-[267px] bg-[#edf0f6] rotate-[-3deg] rounded-[7px]"></div>
            <div className=" sm:w-[330px] w-[375px] h-[247px] absolute top-0 left-[-10px] bg-white rounded-[7px] shadow-md">
              <div
                className="card_topImage"
                style={{
                  backgroundColor: "#40CC9C",
                  width: "99px",
                  height: "93px",
                  borderRadius: "12px",
                }}
              >
                <img src={`https://api.quickt.com.au${service_box_one_icon}`} style={{ width: "50px", height: "50px" }} alt="icon" />
              </div>
              <div className="card_content">
                <div className="card_content_title">
                  <p>
                    {service_box_one_title
                      ? service_box_one_title
                      : "Trust Partner"}
                  </p>
                </div>
                <div className="card_content_desc">
                  {service_box_one_desc
                    ? service_box_one_desc
                    : "Cloudless and of a deep dark blue the spectacle before us was."}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 flex justify-center items-center relative">
          <div >
            <div className="sm:w-[360px] w-[400px] h-[267px] bg-[#edf0f6] rotate-[-3deg] rounded-[7px]"></div>
            <div className=" sm:w-[330px] w-[375px] h-[247px] absolute top-0 left-[-10px] bg-white rounded-[7px] shadow-md">
              <div
                className="card_topImage"
                style={{
                  backgroundColor: "#FFB88A",
                  width: "99px",
                  height: "93px",
                  borderRadius: "12px",
                }}
              >
                <img src={`https://api.quickt.com.au${service_box_two_icon}`} style={{ width: "50px", height: "50px" }} alt="icon" />
              </div>
              <div className="card_content">
                <div className="card_content_title">
                  <p>
                    {service_box_two_title
                      ? service_box_two_title
                      : "Secure Processing"}
                  </p>
                </div>
                <div className="card_content_desc">
                  {service_box_two_desc
                    ? service_box_two_desc
                    : "Cloudless and of a deep dark blue the spectacle before us was."}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 flex justify-center items-center relative">
          <div >
            <div className="sm:w-[360px] w-[400px] h-[267px] bg-[#edf0f6] rotate-[-3deg] rounded-[7px]"></div>
            <div className=" sm:w-[330px] w-[375px] h-[247px] absolute top-0 left-[-10px] bg-white rounded-[7px] shadow-md">

              <div
                className="card_topImage"
                style={{
                  backgroundColor: "#04BEFE",
                  width: "99px",
                  height: "93px",
                  borderRadius: "12px",
                }}
              >
                <img src={`https://api.quickt.com.au${service_box_three_icon}`} style={{ width: "50px", height: "50px" }} alt="icon" />
              </div>
              <div className="card_content">
                <div className="card_content_title">
                  <p>
                    {service_box_three_title
                      ? service_box_three_title
                      : "Award-Winning Team"}
                  </p>
                </div>
                <div className="card_content_desc">
                  {service_box_three_desc
                    ? service_box_three_desc
                    : "Cloudless and of a deep dark blue the spectacle before us was."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseUs;
