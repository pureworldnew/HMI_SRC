import React from "react";
import { Link } from 'react-router-dom';

class SetNewPwdForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,

      password: "",
      rpassword: ""
    };
  }

  onChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSetNewPassword = async e => {
    e.preventDefault();
  };

  handleSubmit = e => {
    this.onSetNewPassword(e);
  };

  render() {
    return (
      <div className="setNewPassword">
        <div className="setNewPassword__container">
          <div className="setNewPassword__header">
            LOGO
          </div>
          <div className="setNewPassword__mid">
            <h1 className="setNewPassword__title">Set New Password</h1>
            <p className="setNewPassword__info">
              We have sent you you the link to your E-Maill address. 
              <br />If you still haven’t receieved. Press <Link className="form__link" to="/">
              ‘Send Again’</Link> here.
            </p>
          </div>

          <form className="form" onSubmit={this.handleSubmit}>
            <div className="form__group" style={{marginTop: "0px"}}>
              <label htmlFor="password">Password</label>
              <input
                value={this.state.password}
                onChange={this.onChangeInput}
                name="password"
                type="password"
              />
            </div>
            <div className="form__group" style={{marginTop: "0px"}}>
              <label htmlFor="e-mail">Confirm Password</label>
              <input
                value={this.state.rpassword}
                onChange={this.onChangeInput}
                name="rpassword"
                type="password"
              />
            </div>
            <button
              className="button button--block"
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default SetNewPwdForm;
