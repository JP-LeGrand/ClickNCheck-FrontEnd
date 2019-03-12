import InitialState from '../../../Shared/State/InitialState';
import * as Types from './ForgotPasswordActionTypes';

const ForgotPasswordReducer = (state = InitialState.forgotPasswordState, action) => {
    switch (action.type) {
    case Types.FORGOT_PASSWORD_REQUEST_INITIATED:
        return {
            ...state,
            ...action.forgotPasswordState
        };
    case Types.FORGOT_PASSWORD_REQUEST_SUCCEEDED:
        return {
            ...state,
            ...action.forgotPasswordState
        };
    case Types.FORGOT_PASSWORD_REQUEST_FAILED:
        return {
            ...state,
            ...action.forgotPasswordState
        };
    default: 
        return state;
    }
};

export default ForgotPasswordReducer;