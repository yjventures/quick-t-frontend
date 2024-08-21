import { NavLink } from "react-router-dom/dist";
import Appstore from "../../assets/images/app-store.svg";
import Playstore from "../../assets/images/google-play.svg";

import "./footer.css";
import { FacebookIcon, Instagram, Linkedin } from "lucide-react";
function Footer() {
  return (
    <div className="footerMain py-10 md:py-20 px-4 gap-10">
      <div className="flex flex-col md:flex-row justify-around ">
        <div>
          <p className="footerHeading">Company</p>
          <div className="flex flex-col">
            <NavLink to={'/about'} className="footerText">About</NavLink>
            <NavLink to={'/'} className="footerText">ASIC and Austrac Regitrations </NavLink>
            <div className="flex gap-2">
              <img src={Playstore} alt="playstore" className="w-30 h-10 cursor-pointer" />
              <img src={Appstore} alt="playstore" className="w-30 h-10 cursor-pointer" />
            </div>
          </div>
        </div>
        {/* Help */}
        <div>
          <p className="footerHeading">Help</p>
          <div className="flex flex-col">
            <NavLink to={'/help-center'} className="footerText">Help Center</NavLink>
            <NavLink to={'/termsAndCondition'} className="footerText">Terms and Conditions </NavLink>
            <NavLink to={'/privacyPolicy'} className="footerText">Privacy Policy </NavLink>
          </div>
        </div>
        {/* contact us */}
        <div>
          <p className="footerHeading">Contact Us</p>
          <div className="footerText flex flex-col gap-6">
            <a href="mailto:ContactUs@quickt.com.au">ContactUs@quickt.com.au</a>
            <a className="" href="tel:+61490918727">phone +61490918727</a>
          </div>
          <div className="flex gap-4 text-white ">
            <a href="#">
              <FacebookIcon size={24} />
            </a>
            <a href="#">
              <Instagram size={24} />
            </a>
            <a href="#">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </div>
      <p className="text-start text-white mt-6">
        <NavLink to="/about" className="md:ms-36">
          &copy; 2021 Quickt. All rights reserved.
        </NavLink>
      </p>
    </div>
  );
}

export default Footer;
