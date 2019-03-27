import InitialState from '../../../Shared/State/InitialState';
import * as Types from './LoginActionTypes';

export default (state = InitialState.loginState, action) => {
    switch (action.type) {
    case Types.UPDATE_LOADING:
        return {
            ...state,
            isLoading: action.payload
        };
    case Types.UPDATE_ERROR:
        return {
            ...state,
            error: action.payload
        };
    case Types.UPDATE_LOGIN_STATUS:
        return {
            ...state,
            loginStatus: action.payload
        };
    case Types.UPDATE_EMAIL:
        return {
            ...state,
            email: action.payload
        };
    case Types.UPDATE_PASSWORD:
        return {
            ...state,
            password: action.payload
        };
    case Types.TOGGLE_PASSWORD_VISIBILITY:
        return {
            ...state,
            isPasswordVisible: action.payload
        };
    case Types.UPDATE_INPUT_TYPE:
        return {
            ...state,
            inputType: action.payload
        };
    default:
        return state;
    }
};