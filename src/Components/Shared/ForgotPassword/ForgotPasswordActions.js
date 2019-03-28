import * as Types from './ForgotPasswordActionTypes';
import axios from 'axios';
import { BASE_URL, FORGOT_PASSWORD_EMAIL,FORGOT_PASSWORD_PHONE } from '../../../Shared/Constants';

export const updateIdentification = (data) => {
    return function (dispatch){
        dispatch({
            type: Types.UPDATE_IDENTIFICATION,
            payload: data
        });
    };
};

export const updateMessenger = (data) => {
    return function (dispatch){
        dispatch({
            type: Types.UPDATE_MESSENGER,
            payload: data
        });
    };
};

export const updateMessengerValidity = (data) => {
    return function (dispatch){
        dispatch({
            type: Types.UPDATE_MESSENGER_VALIDITY,
            payload: data
        });
    };
};

export const updateIdentificationValidity = (data) => {
    return function (dispatch){
        dispatch({
            type: Types.UPDATE_IDENTIFICATION_VALIDITY,
            payload: data
        });
    };
};

export const updateEmailOrSMS = (data) => {
    return function (dispatch){
        dispatch({
            type: Types.UPDATE_EMAIL_SMS,
            payload: data
        });
    };
};

export const sendPasswordReset = (data) => {
    return function (dispatch){
        dispatch({
            type: Types.UPDATE_LOADING,
            payload: true
        });

        axios.post(BASE_URL + FORGOT_PASSWORD_EMAIL, data)
            .then(() => {
                localStorage.setItem('sentTo', 'email');
                window.location = '/forgotPasswordSuccess';
            })
            .catch((error) => {
                dispatch({
                    type: Types.UPDATE_LOADING,
                    payload: false
                });
                dispatch({
                    type: Types.UPDATE_ERROR,
                    payload: 'failedPost'
                });
            });
        dispatch({
            type: Types.UPDATE_MESSAGE_SENT,
            payload: true
        });
    };
};

export const updateLoading = (data) => {
    return function (dispatch){
        dispatch({
            type: Types.UPDATE_LOADING,
            payload: data
        });
    };
};

export const updateError = (data) => {
    return function (dispatch){
        dispatch({
            type: Types.UPDATE_ERROR,
            payload: data
        });
    };
};

export const updateIdentitySelected = (data) => {
    return function (dispatch){
        dispatch({
            type: Types.UPDATE_IDENTITY_SELECTED,
            payload: data
        });
    };
};

export const updateMessengerSelected = (data) => {
    return function (dispatch){
        dispatch({
            type: Types.UPDATE_MESSENGER_SELECTED,
            payload: data
        });
    };
};

export const updatePassportOrID = (data) => {
    return function (dispatch){
        dispatch({
            type: Types.UPDATE_ID_OR_PASSPORT,
            payload: data
        });
    };
};

/*this.updateLoading({ loading: true }, () => {
                    axios.post(BASE_URL + FORGOT_PASSWORD_EMAIL, body)
                        .then(() => {
                            this.setState({
                                loading: false
                            });
                            alert('Forgot password request succesfully sent to email');
                            localStorage.setItem('sentTo', 'email');
                            window.location = '/forgotPasswordSuccess';
                        })
                        .catch((error) => {
                            this.setState({
                                loading: false
                            });
                            alert('Oops something went wrong' + error);
                        });
                });**/

/*export const sendForgotInitiated = () => {
    return {
        type: Types.FORGOT_PASSWORD_REQUEST_INITIATED,
        forgotPasswordState: {
            sending: true
        }
    };
};

export const sendForgotSucceeded = (data) => {
    return {
        type: Types.FORGOT_PASSWORD_REQUEST_SUCCEEDED,
        forgotPasswordState: {
            sending: false,
            ...data
        }
    };
};

export const sendForgotFailed= (err) => {
    return {
        type: Types.FORGOT_PASSWORD_REQUEST_FAILED,
        forgotPasswordState: {
            sending: false,
            errorMessage: err
        }
    };
};

export const sendForgotDetails = (state) => async (dispatch) => {
    dispatch(sendForgotInitiated());
    try {
        if (state.sendVia === 'email'){
            const body = { passportNumber: state.passportNumber, email: state.email };
            const response = await axios.post(BASE_URL+FORGOT_PASSWORD_EMAIL, body);
            alert('Result: '+response.data);
            dispatch(sendForgotSucceeded(response.data));
        } else if (state.sendVia ==='phone'){
            const body = { passportNumber: state.passportNumber, phonenumber: state.phonenumber };
            const response = await axios.post(BASE_URL+FORGOT_PASSWORD_PHONE, body);
            alert('Result: '+response.data);
            dispatch(sendForgotSucceeded(response.data));
        }
    } catch (err) {
        dispatch(sendForgotFailed(err));
    }
};*/