import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Checkbox from 'react-simple-checkbox';
import AuthService from '../../../../services/AuthService';

const SignUp = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rpassword, setRpassword] = useState('');
  const [sendDetailAsEmail, setSendDetailAsEmail] = useState(false);

  const onSignup = async (e) => {
    if (!!email && !!password && !!rpassword) {
      if (password === rpassword) {
        // Temp user data
        const fullName = 'New User';
        const roleId = 5; // Temp user's role is VP Customer Success
        const userId = Math.floor(Math.random() * 1000000000000);

        AuthService.signUp({ userId, fullName, email, roleId, password })
          .then((user) => {
            alert(user.message);
            props.history.push('/login');
          })
          .catch((err) => {
            console.log('signup error', err);
          });
      } else {
        alert('Password does not matched!');
      }
    } else {
      alert('Please provide all information!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignup(e);
  };

  return (
    <div className="signup">
      <div className="signup__container">
        <div className="signup__header">LOGO</div>
        <div className="signup__mid">
          <h1 className="signup__title">Create New Account</h1>
          <p className="signup__info">
            You can create your New Account here,
            <br />
            after filling in your E-Mail and your Password.
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
          <div className="form__group">
            <label htmlFor="password">Confirm Password</label>
            <input
              value={rpassword}
              onChange={(e) => setRpassword(e.target.value)}
              name="rpassword"
              type="password"
            />
          </div>
          <div className="form__group">
            <div>
              <Checkbox
                checked={sendDetailAsEmail}
                size={2.3}
                color="#333"
                onChange={(value) =>
                  setSendDetailAsEmail({ sendDetailAsEmail: value })
                }
              />

              <span className="form__label">
                Send account details to my e-mail address
              </span>
            </div>
          </div>
          <button
            className="button button--block"
            // onClick={handleSubmit}
            type="submit">
            Create Account
          </button>
          <div className="create_new_account">
            <Link className="form__link" to="/login">
              Sign In
            </Link>
          </div>
          <div className="description">
            By clicking “Create Account”, you agree to our <span>Teams</span>.
            Learn how we keep your data secure in our{' '}
            <span>Privacy Policy</span> and <span>Cookies Policy</span>.
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(SignUp);
