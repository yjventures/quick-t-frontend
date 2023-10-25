import React from "react";
import appStore from "../../assets/images/appStore.png";
import playStore from "../../assets/images/playStore.png";
import "./footer.css";
function Footer() {
  return (
    <div className="flex flex-row md:flex-row lg:flex-row xl:flex-row sm:flex-row justify-around  py-10 sm:py-10 md:py-20 lg:py- xl:py-24 footerMain">
      <div>
        <p className="footerHeading">Company</p>
        <p className="footerText">About</p>
        <p className="footerText">Features</p>
        <p className="footerText">Works</p>
        <p className="footerText">Career</p>
      </div>
      <div className="hidden sm:block">
        <p className="footerHeading">Help</p>
        <p className="footerText">Customer Support</p>
        <p className="footerText">Delivery Details</p>
        <p className="footerText">Terms & condition</p>
        <p className="footerText">Privacy Policy</p>
      </div>
      <div className="hidden sm:block">
        <p className="footerHeading">Resources</p>
        <p className="footerText">Free eBooks</p>
        <p className="footerText">Development Tutorial</p>
        <p className="footerText">How to - Blog</p>
        <p className="footerText">Youtube PlayList</p>
      </div>
      <div>
        <p className="footerHeading">Install App</p>
        <img src={appStore} alt="" style={{ marginBottom: "12px" }} />
        <img src={playStore} alt="" />
      </div>
    </div>
  );
}

export default Footer;
