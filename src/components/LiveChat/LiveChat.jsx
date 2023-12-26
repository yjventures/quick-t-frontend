import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function LiveChat() {
  return (
    <div style={{ backgroundColor: "#f5f5f5", paddingTop: "50px" }}>
      <div
        className="card"
        style={{ maxWidth: "1200px", backgroundColor: "#fff" }}
      >
        <div>
          <NavLink to="/" className="flex items-center gap-3">
            <div>
              <svg
                width="18"
                height="13"
                viewBox="0 0 18 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 5.5H3.83L7.41 1.91L6 0.5L0 6.5L6 12.5L7.41 11.08L3.83 7.5H18V5.5Z"
                  fill="#333333"
                />
              </svg>
            </div>
            <p style={{ fontSize: "15px" }}>Back to home</p>
          </NavLink>
        </div>
        <div className="w-100 mt-5">
          <p className="w-42 text-center p-4 bg-slate-200 text-xl text-black rounded-full">Live chat Feature comming soon. Keep with Us</p>
        </div>
      </div>
    </div>
  );
}

export default LiveChat;
