import React from "react";

class SuccessForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  onChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onHandleSuccess = async e => {
    e.preventDefault();
  };

  handleSubmit = e => {
    this.onHandleSuccess(e);
  };

  render() {
    return (
      <div className="forgotPassword">
        <div className="forgotPassword__container">
          <div className="forgotPassword__header">
            LOGO
          </div>
          <div className="success__mid">
            <h1 className="success__title">Success!</h1>
            <div className="success__info">
              Your new password has been set.
            </div>
          </div>

          <button
              className="button button--block"
              onClick={this.handleSubmit}
            >
              Continue to Sign In
          </button>
        </div>
      </div>
    );
  }
}

export default SuccessForm;
