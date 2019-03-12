import * as Types from './ForgotPasswordActionTypes';

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
        type: Types.DUMMY_REQUEST_FAILED,
        forgotPasswordState: {
            sending: false,
            errorMessage: err
        }
    };
};

export const sendForgotDetails = (someParameters) => async (dispatch) => {
    dispatch(sendForgotInitiated());
    try {
        const response = await API.someDataFetchingFunction(someParameters);
        dispatch(sendForgotSucceeded(response.data));
    } catch (err) {
        dispatch(sendForgotFailed(err));
    }
};