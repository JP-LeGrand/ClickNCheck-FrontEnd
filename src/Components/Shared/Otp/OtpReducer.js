import InitialState from '../../../Shared/State/InitialState';
import * as Types from './OtpActionTypes';

const OtpReducer = (state = InitialState.otpState, action) => {
    switch (action.type) {
    case Types.CHANGE_DIGIT_1:
        return {
            ...state,
            digit1: action.payload
        };
    case Types.CHANGE_DIGIT_2:
        return {
            ...state,
            digit2: action.payload
        };
    case Types.CHANGE_DIGIT_3:
        return {
            ...state,
            digit3: action.payload
        };
    case Types.CHANGE_DIGIT_4:
        return {
            ...state,
            digit4: action.payload
        };
    case Types.CHANGE_DIGIT_5:
        return {
            ...state,
            digit5: action.payload
        };
    case Types.ASSIGN_USER:
        return {
            ...state,
            user_id: action.payload
        };
    case Types.SUBMIT_OTP:
        return {
            ...state,
            loading: action.payload
        };
    case Types.SUBMIT_CLICKED:
        return {
            ...state,
            clicked: action.payload
        };
    case Types.ERROR_MESSAGE:
        return {
            ...state,
            error: action.payload
        };
    default:
        return state;
    }
};

export default OtpReducer;