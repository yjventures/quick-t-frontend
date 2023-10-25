import { Avatar, Dropdown, Navbar } from "flowbite-react";
import logo from "../assets/images/logo.png";
import { Link, NavLink } from "react-router-dom";
import "./Headers.css";

export default function Headers() {
  const jwt = localStorage.getItem("jwt");
  return (
    <Navbar
      className="fixed w-full flex-row"
      style={{ backgroundColor: "#EEE", zIndex: "2" }}
    >
      <Navbar.Brand href="/">
        <img
          src={logo}
          style={{ width: "208px", height: "66px" }}
          className="mr-3 h-6 sm:h-9 rounded-full"
          alt=""
        />
      </Navbar.Brand>
      {jwt ? (
        <div className="flex md:order-2">
          <div className="hidden md:flex">
            {/* Dropdown section for large and medium screens */}
            <Dropdown
              arrowIcon={true}
              inline
              label={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    alt="User settings"
                    img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    rounded
                    height="40"
                    width="40"
                  />
                  <span style={{ marginLeft: "5px" }}>Usernamed</span>
                </div>
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">Bonnie Green</span>
                <span className="block truncate text-sm font-medium">
                  name@flowbite.com
                </span>
              </Dropdown.Header>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
          </div>
          <Navbar.Toggle />
        </div>
      ) : (
        <div className="flex md:order-2">
          <div className="hidden md:flex">
            <NavLink to="/register">
              <button className="headerSignUp">Sign Up </button>
            </NavLink>
          </div>
          <Navbar.Toggle />
        </div>
      )}
      <Navbar.Collapse>
        {/* Links in collapsed section */}
        <NavLink to="/hello">
          <p className="active-link py-4">how it works</p>
        </NavLink>
        <NavLink to="/pricing">
          <p className="active-link  py-4">Pricing</p>
        </NavLink>

        <NavLink to="/hello">
          <p className="active-link  py-4">Help Center</p>
        </NavLink>

        <NavLink to="/hello">
          <p className="active-link  py-4">News</p>
        </NavLink>
        {/* End of links */}
        {/* Dropdown section for small screens */}
        {jwt ? (
          <div className="md:hidden  py-4">
            <Dropdown
              arrowIcon={true}
              inline
              label={
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar
                    alt="User settings"
                    img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    rounded
                  />
                  <span style={{ marginLeft: "5px" }}>Usernamed</span>
                </div>
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">Bonnie Green</span>
                <span className="block truncate text-sm font-medium">
                  name@flowbite.com
                </span>
              </Dropdown.Header>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item>Sign out</Dropdown.Item>
            </Dropdown>
          </div>
        ) : (
          <div className="md:hidden py-4">
            <NavLink to="/register">
              <button className="headerSignUp">Sign Up</button>
            </NavLink>
          </div>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
