import * as Types from './ForgotPasswordActionTypes';
import axios from 'axios';
import { BASE_URL, FORGOT_PASSWORD_EMAIL,FORGOT_PASSWORD_PHONE } from '../../../Shared/Constants';

export const sendForgotInitiated = () => {
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
};