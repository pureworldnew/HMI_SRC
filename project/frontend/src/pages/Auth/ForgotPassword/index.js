import React from 'react';
import ForgotPwdForm from './ForgotPwdForm';

const ForgotPassword = () => {
  return (
    <div className="forgotPasswordPage">
      <div className="forgotPasswordPage__wrapper">
        <div className="loginPage__image-wrapper">
          <div class="forgotPasswordPage__image-wrapper__inner">
            <div class="forgotPasswordPage__image-wrapper__inner__logo">
              <img
                src="./Green_Box_Logo-removebg-preview.png"
                alt=""
                width="217px"
                height="59px"
              />
            </div>
            <div class="forgotPasswordPage__image-wrapper__inner__subscribe">
              Alarms with text or email notification, show trending and
              historical data that make your life easier.
            </div>
            <div className="forgotPasswordPage__image-wrapper__inner__image-container">
              <img src="./login-illustration.b44313d5.svg" alt="" />
            </div>
          </div>
        </div>
        <ForgotPwdForm />
      </div>
    </div>
  );
};

export default ForgotPassword;
