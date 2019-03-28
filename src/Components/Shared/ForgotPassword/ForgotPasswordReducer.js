import InitialState from '../../../Shared/State/InitialState';
import * as Types from './ForgotPasswordActionTypes';

const ForgotPasswordReducer = (state = InitialState.forgotPasswordState, action) => {
    switch (action.type) {
    case Types.UPDATE_IDENTIFICATION:
        return {
            ...state,
            identification: action.payload,
        };
    case Types.UPDATE_ID_OR_PASSPORT:
        return {
            ...state,
            passportOrID: action.payload,
        };
    case Types.UPDATE_MESSENGER:
        return {
            ...state,
            messenger: action.payload
        };
    case Types.UPDATE_MESSENGER_VALIDITY:
        return {
            ...state,
            validMessenger: action.payload
        };
    case Types.UPDATE_MESSAGE_SENT:
        return {
            ...state,
            messageSent: action.payload
        };
    case Types.UPDATE_LOADING:
        return {
            ...state,
            loading: action.payload
        };
    case Types.UPDATE_IDENTIFICATION_VALIDITY:
        return {
            ...state,
            validIdentification: action.payload
        };
    case Types.UPDATE_EMAIL_SMS:
        return {
            ...state,
            emailOrSMS: action.payload
        };
    case Types.UPDATE_MESSENGER_SELECTED:
        return {
            ...state,
            messengerSelected: action.payload
        };
    case Types.UPDATE_IDENTITY_SELECTED:
        return {
            ...state,
            identitySelected: action.payload
        };
    case Types.UPDATE_ERROR:
        return {
            ...state,
            error: action.payload,
        };
    default: 
        return state;
    }
};

export default ForgotPasswordReducer;