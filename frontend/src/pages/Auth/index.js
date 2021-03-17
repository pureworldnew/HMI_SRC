import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Login from './Login';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import SetNewPwdForm from './SetNewPassword';
import Success from './Success';


const Auth = () => {
    return (
        <Switch>
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
            {/* <Redirect from='/' to='/login' /> */}
        </Switch>
    );
};

export default Auth;
