import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Checkbox from 'react-simple-checkbox';

import { setItemsLocalStorage } from '../../../../utils/Auth';
import AuthService from '../../../../services/AuthService';

const LoginForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const onLogin = () => {
    if (!!email && !!password) {
      AuthService.signIn({ email, password })
        .then((user) => {
          setItemsLocalStorage(
            user.accessToken,
            user.data.roleId,
            user.data.companyId,
            user.data.fullName,
            'ACV'
          );
          props.history.push('/dashboard');
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert('Please provide email and password');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__header">
          <img
            src="./Green_Box_Logo-removebg-preview.png"
            alt=""
            width="140px"
            height="45px"
          />
        </div>
        <div className="login__mid">
          <h1 className="login__title">Sign In</h1>
          <p className="login__info">
            Please enter your E-Mail and Password in order to Sign In. In case
            you forgot your password please click on Forgot Password.
          </p>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form__group" style={{ marginTop: '0px' }}>
            <label htmlFor="e-mail">E-Mail Address</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email"
              type="text"
            />
          </div>
          <div className="form__group">
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              type="password"
            />
          </div>
          <div
            className="form__group"
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
            <div>
              <Checkbox
                checked={rememberMe}
                size={3.8}
                color="#333"
                onChange={(value) => setRememberMe(value)}
              />
              <span
                className="form__label"
                onClick={() => setRememberMe(!rememberMe)}>
                Remember Me
              </span>
            </div>
            <Link className="form__link" to="/forgot_password">
              Forgot Password
            </Link>
          </div>
          <button
            className="button button--block"
            // onClick={handleSubmit}
            type="submit">
            Sign In
          </button>
          <div className="create_new_account">
            <Link className="form__link" to="/signup">
              Create New Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(LoginForm);
