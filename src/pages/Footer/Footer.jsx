import { NavLink } from "react-router-dom/dist";
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
      <div className="">
        <p className="footerHeading">Help</p>
        <p className="footerText">Customer Support</p>
        <p className="footerText">Delivery Details</p>
        <NavLink to="/termsAndCondition">
          <p className="footerText cursor-pointer">Terms And Condition</p>
        </NavLink>
        <NavLink to="/termsAndCondition">
          <p className="footerText cursor-pointer">Privacy Policy</p>
        </NavLink>
      </div>
      <div className="hidden sm:block">
        <p className="footerHeading">Resources</p>
        <p className="footerText">Free eBooks</p>
        <p className="footerText">Development Tutorial</p>
        <p className="footerText">How to - Blog</p>
        <p className="footerText">Youtube PlayList</p>
      </div>
    </div>
  );
}

export default Footer;
