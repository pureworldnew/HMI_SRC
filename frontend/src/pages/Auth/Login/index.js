import React from 'react';
import LoginForm from './LoginForm';

const Login = () => {
  return (
    <div className="loginPage">
      <div className="loginPage__wrapper">
        <div className="loginPage__image-wrapper">
          <div class="loginPage__image-wrapper__inner">
            <div class="loginPage__image-wrapper__inner__logo">
              <img
                src="./Green_Box_Logo-removebg-preview.png"
                alt=""
                width="217px"
                height="59px"
              />
            </div>
            <div class="loginPage__image-wrapper__inner__subscribe">
              Alarms with text or email notification, show trending and
              historical data that make your life easier.
            </div>
            <div class="loginPage__image-wrapper__inner__image-container">
              <img src="./login-illustration.b44313d5.svg" alt="" />
            </div>
          </div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
