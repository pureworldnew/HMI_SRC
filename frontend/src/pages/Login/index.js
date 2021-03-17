import React from "react";
import LoginForm from "./LoginForm";

const Login = ({ handleLoginSuccess }) => {
  return (
    <div className="loginPage">
      <div className="loginPage__wrapper">
        <div className="loginPage__image-wrapper"></div>
        <LoginForm handleLoginSuccess={handleLoginSuccess} />
      </div>
    </div>
  );
};

export default Login;
