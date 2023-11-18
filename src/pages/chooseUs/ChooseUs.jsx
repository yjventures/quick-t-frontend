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
    <div className="chooseUsMain py-10 md:py-14 lg:py-14 xl:py-14 container mx-auto">
      <div className="text-center">
        <p className="chooseUsTextIntro ">WE HELP FOR YOU</p>
        <p className="chooseUsTextIntroHeading text-4xl md:text-5xl lg:text-5xl xl:text-5xl pt-5">
          {/* look here image is showing,  */}
          Why Chooes Us
          
        </p>
      </div>
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center lg:justify-between items-center mt-20">
          <div className="w-full sm:w-2/2 md:w-auto lg:w-auto p-4 mt-20">
            <div style={{ position: "relative" }}>
              <div className="services_bgCard" style={{}}></div>
              <div className="services_card">
                <img src={color} alt="icon" className="card_topImage" />
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
          <div className="w-full sm:w-2/2 md:w-auto lg:w-auto p-4 mt-20">
            <div style={{ position: "relative" }}>
              <div className="services_bgCard" style={{}}></div>
              <div className="services_card">
                <img src={color} alt="icon" className="card_topImage" />
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
          <div className="w-full sm:w-2/2 md:w-auto lg:w-auto p-4 mt-20">
            <div style={{ position: "relative" }}>
              <div className="services_bgCard" style={{}}></div>
              <div className="services_card">
                <img src={color} alt="icon" className="card_topImage" />
                <div className="card_content">
                  <div className="card_content_title">
                    <p>
                      {service_box_three_title
                        ? service_box_three_title
                        : "24/7 Support"}
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
    </div>
  );
}

export default ChooseUs;
