import React, { useState, useEffect } from "react";
import "./Headers.css";
import logo from "../assets/images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false); // State to handle the dropdown visibility
  const [showMobileMenu, setShowMobileMenu] = useState(false); // State to handle the mobile menu visibility
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const navigate = useNavigate();
  // get user details
  const { isPending: pendingUser, error: userError, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () =>
      fetch("https://api.quickt.com.au/api/users/me", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
        .then((res) => res.json())
  });
  if (userError) return showFailedAlert("Something went wrong");
  // console.log(user);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768); // Adjust the value based on your breakpoint
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleMobileMenuToggle = () => {
    setShowMobileMenu(!showMobileMenu);
  };

  const jwt = localStorage.getItem("jwt");
  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* Website Logo */}
        <img
          src={logo}
          alt="Logo"
          className="logo"
          style={{ width: "208px", height: "66px" }}
        />
      </div>
      {/* Middle section with Nav Links for Large Screens */}
      {!isSmallScreen && (
        <div className="navbar-middle">
          <ul className="nav-links">
            <li>
              <a href="/how-it-works">How It Works</a>
            </li>
            <li>
              <a href="/about">Pricing</a>
            </li>
            <li>
              <a href="/works">Help Center</a>
            </li>
            <li>
              <a href="/">News</a>
            </li>
          </ul>
        </div>
      )}

      <div className="navbar-right">
        {/* User Profile */}
        {jwt ? (
          <div
            className="user-profile hidingUserProfile"
            onClick={handleDropdownToggle}
          >
            <img
              src={user?.image ? `https://api.quickt.com.au` + user?.image : "https://www.w3schools.com/howto/img_avatar.png"}
              alt="User"
              className="user-image"
            />

            <span className="user-name">{user?.first_name}</span>
            <span className="arrow-icon">
              {showDropdown ? "\u25B2" : "\u25BC"}
            </span>
          </div>
        ) : (
          <div className="user-profile hidingUserProfile">
            <NavLink to="/register">
              <button className="headerSignUp">Sign Up</button>
            </NavLink>
          </div>
        )}

        {/* Dropdown */}
        {showDropdown && (
          <div className="dropdown mobile-dropdown">
            <ul
              style={{
                cursor: "pointer",
              }}
            >
              <li
                onClick={() => {
                  navigate("/personalInfo");
                }}
              >
                Settings
              </li>
              <li
                onClick={() => {
                  localStorage.clear();
                  navigate("/login");
                }}
              >
                Logout
              </li>
            </ul>
          </div>
        )}

        {/* Mobile Menu Icon for Small Devices */}
        {isSmallScreen && (
          <div className="menu-icon" onClick={handleMobileMenuToggle}>
            {showMobileMenu ? (
              <span style={{ fontSize: "30px" }}>&times;</span> // Cross icon
            ) : (
              <span style={{ fontSize: "20px" }}>&#9776;</span> // Three-line icon
            )}
          </div>
        )}

        {/* Mobile Menu Dropdown */}
        {showMobileMenu && isSmallScreen && (
          <div className="mobile-menu">
            <ul className="nav-links">
              <li>
                <a href="/how-it-works">How It Works</a>
              </li>
              <li>
                <a href="/about">Pricing</a>
              </li>
              <li>
                <a href="/works">Help Center</a>
              </li>
              <li>
                <a href="/">News</a>
              </li>
              <li>
                {jwt ? (
                  <div className="user-profile " onClick={handleDropdownToggle}>
                    <img
                      src="https://www.w3schools.com/howto/img_avatar.png"
                      alt="User"
                      className="user-image"
                    />
                    <span className="user-name">Username</span>
                    <span className="arrow-icon">
                      {showDropdown ? "\u25B2" : "\u25BC"}
                    </span>
                  </div>
                ) : (
                  <div className="user-profile ">
                    <NavLink to="/register">
                      <button className="headerSignUp">Sign Up</button>
                    </NavLink>
                  </div>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
