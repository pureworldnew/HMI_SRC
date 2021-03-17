import React from "react";

class ForgotPwdForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,

      email: ""
    };
  }

  onChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onForgotPassword = async e => {
    e.preventDefault();
  };

  handleSubmit = e => {
    this.onForgotPassword(e);
  };

  render() {
    return (
      <div className="forgotPassword">
        <div className="forgotPassword__container">
          <div className="forgotPassword__header">
            LOGO
          </div>
          <div className="forgotPassword__mid">
            <h1 className="forgotPassword__title">Forgot Password</h1>
            <p className="forgotPassword__info">
              We can send you a new password link to your E-Mail. 
              <br />Please type in your E-Mail with account.
            </p>
          </div>

          <form className="form" onSubmit={this.handleSubmit}>
            <div className="form__group" style={{marginTop: "0px"}}>
              <label htmlFor="e-mail">E-Mail Address</label>
              <input
                value={this.state.email}
                onChange={this.onChangeInput}
                name="email"
                type="text"
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

export default ForgotPwdForm;
