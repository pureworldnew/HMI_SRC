import React from "react";
import SetNewPwdForm from "./SetNewPwdForm";

const setNewPassword = () => {
  return (
    <div className="setnewPasswordPage">
      <div className="setNewPasswordPage__wrapper">
        <div className="setNewPasswordPage__image-wrapper">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M43.5 4.5H4.5C2.01825 4.5 0 6.51825 0 9V39C0 41.4818 2.01825 43.5 4.5 43.5H43.5C45.9818 43.5 48 41.4818 48 39V9C48 6.51825 45.9818 4.5 43.5 4.5ZM4.5 7.5H43.5C44.3265 7.5 45 8.1735 45 9V29.379L35.5605 19.9395C34.9748 19.3538 34.0252 19.3538 33.4395 19.9395L19.5 33.879L14.5605 28.9395C13.9747 28.3537 13.0253 28.3537 12.4395 28.9395L3 38.379V9C3 8.1735 3.67275 7.5 4.5 7.5ZM5.121 40.5L13.5 32.121L17.379 36L12.879 40.5H5.121ZM43.5 40.5H17.121L34.5 23.121L45 33.621V39C45 39.8273 44.3265 40.5 43.5 40.5Z" fill="black" />
            <path d="M12 24C14.4818 24 16.5 21.9818 16.5 19.5C16.5 17.0182 14.4818 15 12 15C9.51825 15 7.5 17.0182 7.5 19.5C7.5 21.9818 9.51825 24 12 24ZM12 18C12.8265 18 13.5 18.6727 13.5 19.5C13.5 20.3273 12.8265 21 12 21C11.1727 21 10.5 20.3273 10.5 19.5C10.5 18.6727 11.1727 18 12 18Z" fill="black" />
          </svg>
        </div>
          <SetNewPwdForm />
      </div>
    </div>
  );
};

export default setNewPassword;
