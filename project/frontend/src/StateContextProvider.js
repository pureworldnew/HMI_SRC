import React, { createContext, useContext, useReducer } from 'react';
// import { getLanguage } from './utils/i18n';
import { USER_LOGIN, USER_LOGOUT } from './store/constants';
export const StateContext = createContext();

let checkLogin = localStorage.getItem('access_token');
let loggedInUser = localStorage.getItem('username');
export const initialState =
    checkLogin ? {
        authenticated: true,
        user: { name: loggedInUser, displayName: loggedInUser },
        verifiedCredentials: true
    } : {};

export const reducer = (state, action) => {
    switch (action.type) {
        case USER_LOGIN:
            return {
                ...state,
                authenticated: true,
                user: { name: loggedInUser, displayName: loggedInUser },
                verifiedCredentials: true
            };
        case USER_LOGOUT:
            return {
                ...state,
                authenticated: false,
                user: { name: "", displayName: "" },
                verifiedCredentials: false
            };
        default:
            return state;
    }
};

export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)} >
        {children}
    </StateContext.Provider>
);
export const useStateValue = () => useContext(StateContext);