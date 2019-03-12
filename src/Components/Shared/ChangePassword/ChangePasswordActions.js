import * as Types from './ChangePasswordActionTypes';

export const changeInitiated = () => {
    return {
        type: Types.CHANGE_PASSWORD_REQUEST_INITIATED,
        changePasswordState: {
            changing: true
        }
    };
};

export const changeSucceeded = (data) => {
    return {
        type: Types.CHANGE_PASSWORD_REQUEST_SUCCEEDED,
        changePasswordState: {
            sending: false,
            ...data
        }
    };
};

export const changeFailed= (err) => {
    return {
        type: Types.CHANGE_PASSWORD_REQUEST_FAILED,
        changePasswordState: {
            sending: false,
            errorMessage: err
        }
    };
};

export const sendForgotDetails = (someParameters) => async (dispatch) => {
    dispatch(changeInitiated());
    try {
        const response = await API.someDataFetchingFunction(someParameters);
        dispatch(changeSucceeded(response.data));
    } catch (err) {
        dispatch(changeFailed(err));
    }
};