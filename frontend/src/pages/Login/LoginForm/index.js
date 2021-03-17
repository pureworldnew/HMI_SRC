import React from "react";
import Checkbox from "react-simple-checkbox";
import { Link } from "react-router-dom";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,

      email: "",
      password: "",
      rememberMe: false
    };
  }

  onChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onLogin = async e => {
    e.preventDefault();
    this.props.handleLoginSuccess({
      authenticated: true,
      user: { name: "Gabe L.", displayName: "Gabe L." },
      verifiedCredentials: true
    });
  };

  handleSubmit = e => {
    this.onLogin(e);
  };

  render() {
    return (
      <div className="login">
        <div className="login__container">
          <div className="login__header">
            <h2>LOGO</h2>
          </div>
          <div className="login__mid">
            <h1 className="login__title">Sign In</h1>
            <p className="login__info">
              Please enter your E-Mail and Password in order to Sign In.
              In case you forgot your password please click on Forgot Password.
            </p>
          </div>

          <form className="form" onSubmit={this.handleSubmit}>
            <div className="form__group">
              <label htmlFor="e-mail">E-Mail Address</label>
              <input
                value={this.state.email}
                onChange={this.onChangeInput}
                name="email"
                type="text"
              />
            </div>
            <div className="form__group">
              <label htmlFor="password">Password</label>
              <input
                value={this.state.password}
                onChange={this.onChangeInput}
                name="password"
                type="password"
              />
            </div>
            <div
              className="form__group"
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div>
                <Checkbox
                  checked={this.state.rememberMe}
                  size={2.3}
                  color="#333"
                  onChange={value => this.setState({ rememberMe: value })}
                />
                <span className="form__label">Remember Me</span>
              </div>
              <Link className="form__link" to="/forgotPassword">
                Forgot Password
              </Link>
            </div>
            <button
              className="button button--block"
              onClick={this.handleSubmit}
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
