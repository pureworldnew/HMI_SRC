export default function validate(values) {
  let errors = {};
  if (!values.firstName) {
    errors.firstName = 'First name is required';
  } else if (values.firstName.length > 30) {
    errors.firstName = 'First name must be up to 30 chars.';
  }

  if (!values.lastName) {
    errors.lastName = 'Last name is required';
  } else if (values.lastName.length > 60) {
    errors.firstName = 'First name must be up to 30 chars.';
  }

  if (!values.displayName) {
    errors.displayName = 'Display name is required';
  }

  if (!values.companyName) {
    errors.companyName = 'Display name is required';
  }

  if (!values.email) {
    errors.email = 'Email address is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 8) {
    errors.password = 'Password must be 8 or more characters';
  } else {
    if (!values.cpassword) {
      errors.cpassword = 'Confirm password is required';
    } else if (values.cpassword !== values.password) {
      errors.cpassword = 'Confirm password must match';
    }
  }

  if (!values.agree) {
    errors.agree = 'Must agree'
  }

  console.log('errors:')
  console.log(errors)
  return errors;
};
