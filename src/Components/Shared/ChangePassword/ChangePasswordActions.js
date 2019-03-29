import * as Types from './ChangePasswordActionTypes';
import { BASE_URL, CHANGE_PASSWORD, OTP_AUTHENTICATION } from '../../../Shared/Constants';

export const updateConfirmedPassword = (data) => {
    return function (dispatch){
        dispatch({
            type: Types.UPDATE_CONFIRMED_PASSWORD,
            payload: data
        });
    }
};

export const updatePassword = (data) => {
    return function (dispatch){
        dispatch({
            type: Types.UPDATE_PASSWORD,
            payload: data 
        });
    };
};

export const updateLoading = (data) => {
    return function (dispatch){
        dispatch({
            type: Types.UPDATE_LOADING,
            payload: data 
        });
    }
};

export const updateFetchError = (data) => {
    return function (dispatch){
        dispatch({
            type: Types.UPDATE_FETCH_ERROR,
            payload: data 
        });
    }
};

export const updateErrorMessage = (data) => {
    return function (dispatch){
        dispatch({
            type: Types.UPDATE_ERROR_MESSAGE,
            payload: data 
        });
    };
};

export const updatePasswordsMatch = (data) => {
    return function (dispatch){
        dispatch({
            type: Types.UPDATE_PASSWORDS_MATCH,
            payload: data 
        });
    };
};

export const updatePasswordsValid = (data) => {
    return function (dispatch){
        dispatch({
            type: Types.UPDATE_PASSWORDS_VALID,
            payload: data 
        });
    };
};

export const sendPasswordReset =(data) =>{
    return function (dispatch) {
        dispatch({
            type: Types.UPDATE_LOADING,
            payload: true
        });
        let userid = localStorage.getItem('user_id');
        fetch(BASE_URL+CHANGE_PASSWORD+userid, {
            method: 'POST',
            mode: 'cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
                'Content-Type': 'application/json',
            },
            redirect: 'manual', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify(data), 
        })
            .then(
                () => {
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
                        body: JSON.stringify(100), 
                    })
                        .then((response) => {
                            response.json();
                            if(response.status === 200){
                                dispatch({
                                    type: Types.UPDATE_FETCH_ERROR,
                                    payload: ''
                                });
                                dispatch({
                                    type: Types.UPDATE_LOADING,
                                    payload: false
                                });
                                window.location = '/otp';
                            } else {
                                dispatch({
                                    type: Types.UPDATE_FETCH_ERROR,
                                    payload: 'Something went wrong updating your password. Please try again later'
                                });
                                dispatch({
                                    type: Types.UPDATE_LOADING,
                                    payload: false
                                });
                                return;
                            }
                        }, 
                        (error) =>{
                            dispatch({
                                type: Types.UPDATE_FETCH_ERROR,
                                payload: 'Something went wrong updating your password. Please try again later'
                            });
                            dispatch({
                                type: Types.UPDATE_LOADING,
                                payload: false
                            });

                        })
                        .catch((error) => {
                            dispatch({
                                type: Types.UPDATE_FETCH_ERROR,
                                payload: 'Something went wrong updating your password. Please try again later'
                            });
                            dispatch({
                                type: Types.UPDATE_LOADING,
                                payload: false
                            });
                        })
                },
                (error) => {
                    dispatch({
                        type: Types.UPDATE_LOADING,
                        payload: false
                    });
                    dispatch({
                        type: Types.UPDATE_FETCH_ERROR,
                        payload: 'Something went wrong while updating your password. Please try again later'
                    });
                }
            );
    };
};