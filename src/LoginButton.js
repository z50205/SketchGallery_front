import React, { useState } from "react";

const LoginButton = ({ username }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseOver = () => {
    setIsHovered(true);
  };

  const handleMouseOut = () => {
    setIsHovered(false);
  };

  const logout = () => {
    const form = document.createElement("form");
    form.method = "GET";
    form.action = "/logout";
    document.body.appendChild(form);
    form.submit();
  };
  const login = () => {
    window.location.href  = "/";
  };

  return (
    <h3 className="mx-3" style={{ width: "80px", height: "80px" }}>
      <button
        className={`btn ${
          username
            ? isHovered
              ? "btn-outline-dark"
              : "btn-outline-primary"
            : "btn-outline-success"
        }`}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        onClick={username ? (isHovered ? logout : null) : login}
        //   disabled={!isHovered}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          className="bi bi-person-circle"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"></path>
          <path
            fillRule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
          ></path>
        </svg>
        <span>{username ? (isHovered ? "Logout" : username) : "Login"}</span>
      </button>
    </h3>
  );
};

export default LoginButton;
