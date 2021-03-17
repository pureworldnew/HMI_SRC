import React from 'react';
import T from 'i18n-react';

const Account = (props) => {
    return (
        <div className="container-fluid account" id="account">
          <h3 className="page-title"><T.span text="account.account" /></h3>
          <div className="account-container">
            <h1>Account page</h1>
          </div>
        </div>
    )
};

export default Account;