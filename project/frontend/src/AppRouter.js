import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from './utils/history';

import MainRouter from './MainRouter';

import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import ForgotPassword from './pages/Auth/ForgotPassword';
import SetNewPwdForm from './pages/Auth/SetNewPassword';
import Success from './pages/Auth/Success';

const AppRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/forgot_password">
          <ForgotPassword />
        </Route>
        <Route path="/set_new_password">
          <SetNewPwdForm />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
        <Route path="/" component={MainRouter} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
