import React from 'react';
import Logo from "assets/images/logo/logo-dark.png";
import useForm from "../../utils/useForm";
import validate from './SignUpFormValidationRules';
import T from 'i18n-react';

const SignUp = () => {
  const {
    values,
    errors,
    handleChange,
    handleSubmit,
  } = useForm(registerCallback, validate);

  function registerCallback() {
    console.log('No errors, submit callback called!');
  }

  return (
    <p>signup</p>
  );
}

export default SignUp;
