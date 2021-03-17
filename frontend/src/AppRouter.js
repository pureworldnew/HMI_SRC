import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from './utils/history';
import { useDispatch } from 'react-redux';

import MainRouter from './MainRouter';
// import Auth from './pages/Auth';

import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import ForgotPassword from './pages/Auth/ForgotPassword';
import SetNewPwdForm from './pages/Auth/SetNewPassword';
import Success from './pages/Auth/Success';
// import PrivateRoute from  './PrivateRoute';




const AppRouter = () => {


  return (
    <Router history={history}>
      <Switch>
        {/* <PrivateRoute exact path="/" component={MainRouter} /> */}
        {/* <Route exact path='/login' component={Auth} /> */}
        <Route exact path='/login' >
          <Login />
        </Route>
        <Route path='/signup' >
          <SignUp />
        </Route>
        <Route path='/forgot_password' >
          <ForgotPassword />
        </Route>
        <Route path='/set_new_password' >
          <SetNewPwdForm />
        </Route>
        <Route path='/success' >
          <Success />
        </Route>
        <Route path='/' component={MainRouter} />
        {/* <Redirect from="*" to="/" /> */}
      </Switch>
    </Router>
  );
};

export default AppRouter;
