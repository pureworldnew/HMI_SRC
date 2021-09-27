import React from 'react';
import SignUpForm from './SignUpForm';

const SignUp = () => {
  return (
    <div className="signupPage">
      <div className="signupPage__wrapper">
        <div className="signupPage__image-wrapper">
          <div class="signupPage__image-wrapper__inner">
            <div class="signupPage__image-wrapper__inner__logo">
              <img
                src="./Green_Box_Logo-removebg-preview.png"
                alt=""
                width="217px"
                height="59px"
              />
            </div>
            <div class="signupPage__image-wrapper__inner__subscribe">
              Alarms with text or email notification, show trending and
              historical data that make your life easier.
            </div>
            <div class="signupPage__image-wrapper__inner__image-container">
              <img src="./login-illustration.b44313d5.svg" alt="" />
            </div>
          </div>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignUp;
