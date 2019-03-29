import * as Types from './LoginActionTypes';
import { BASE_URL, AUTHENTICATE_LOGIN, PASS_EXPIRED, OTP_AUTHENTICATION } from '../../../Shared/Constants';
import { types } from 'util';

export const loginProcess = (email, password) => {
    return function(dispatch){

        let credentials = [ email, password ];
        fetch(BASE_URL + AUTHENTICATE_LOGIN, {
            method: 'POST',
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'manual', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(credentials),
        })
            .then((response) => response.json())
            .then(
                response => {
                    localStorage.setItem('user_id', response);
                    let userid = localStorage.getItem('user_id');
                    fetch(BASE_URL + PASS_EXPIRED + response, {
                        method: 'POST',
                        mode: 'cors', // no-cors, cors, *same-origin
                        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                        credentials: 'same-origin', // include, *same-origin, omit
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        redirect: 'manual', // manual, *follow, error
                        referrer: 'no-referrer', // no-referrer, *client 
                    })
                        .then((pass_exp_response) => pass_exp_response.json())
                        .then(
                            (pass_exp_response) => {
                                if (pass_exp_response === true) {
                                    window.location = '/changePassword';
                                } else if (pass_exp_response === false) {
                                    fetch(BASE_URL + OTP_AUTHENTICATION, {
                                        method: 'POST',
                                        mode: 'cors', // no-cors, cors, *same-origin
                                        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                                        credentials: 'same-origin', // include, *same-origin, omit
                                        headers: {
                                            'Content-Type': 'application/json',
                                        },
                                        redirect: 'manual', // manual, *follow, error
                                        referrer: 'no-referrer', // no-referrer, *client
                                        body: JSON.stringify(userid),
                                    })
                                        .then((otp_response) => otp_response.json())
                                        .then(
                                            () => {
                                                dispatch({
                                                    type: Types.UPDATE_LOADING,
                                                    payload: false
                                                });
                                                dispatch({
                                                    type: Types.UPDATE_ERROR,
                                                    payload: ''
                                                });
                                                dispatch({
                                                    type: Types.UPDATE_LOGIN_STATUS,
                                                    payload: 'success'
                                                });
                                                window.location = '/otp';
                                            },
                                            (error) => {
                                                dispatch({
                                                    Types: types.UPDATE_LOADING,
                                                    payload: false
                                                });
                                                dispatch({
                                                    Types: types.UPDATE_ERROR,
                                                    payload: 'loadOTP'
                                                });
                                                dispatch({
                                                    type: Types.UPDATE_LOGIN_STATUS,
                                                    payload: 'failed'
                                                });
                                            }
                                        );
                                }
                            },
                            (error) => {
                                dispatch({
                                    type: Types.UPDATE_LOADING,
                                    payload: false
                                });
                                
                                dispatch({
                                    type: Types.UPDATE_LOGIN_STATUS,
                                    payload: 'failed'
                                });
                            }
                        );
                },
                (error) => {
                    dispatch({
                        type: Types.UPDATE_LOADING,
                        payload: false
                    });
                    dispatch({
                        type: Types.UPDATE_LOGIN_STATUS,
                        payload: 'failed'
                    });
                    dispatch({
                        type: Types.UPDATE_ERROR,
                        payload: 'wrongCredentials'
                    });
                }
            );
    };
};

export const updateEmail = (email) => {
    return function(dispatch){
        dispatch({
            type: Types.UPDATE_EMAIL,
            payload: email
        });
    };
};

export const updatePassword = (password) => {
    return function(dispatch){
        dispatch({
            type: Types.UPDATE_PASSWORD,
            payload: password
        });
    };
};

export const togglePasswordVisibility = (data) => {
    return function(dispatch){
        dispatch({
            type: Types.TOGGLE_PASSWORD_VISIBILITY,
            payload: data
        });
    };
};

export const updateInputType = (inputType) => {
    return function(dispatch){
        dispatch({
            type: Types.UPDATE_INPUT_TYPE,
            payload: inputType
        });
    };
};

export const toggleLoading = (data) => {
    return function(dispatch){
        dispatch({
            type: Types.UPDATE_LOADING,
            payload: data
        });
    };
};

export const updateError = (err) => {
    return function(dispatch){
        dispatch({
            type: Types.UPDATE_ERROR,
            payload: err
        });
    };
};