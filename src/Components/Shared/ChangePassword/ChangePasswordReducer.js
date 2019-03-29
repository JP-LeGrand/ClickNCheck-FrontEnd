import InitialState from '../../../Shared/State/InitialState';
import { UPDATE_ERROR_MESSAGE, UPDATE_CONFIRMED_PASSWORD, UPDATE_PASSWORDS_MATCH, UPDATE_PASSWORDS_VALID, UPDATE_FETCH_ERROR } from './ChangePasswordActionTypes';
import { UPDATE_PASSWORD, UPDATE_LOADING } from '../Login/LoginActionTypes';

const ChangePasswordReducer = (state = InitialState.changePasswordState, action) => {
    switch (action.type) {
    case UPDATE_ERROR_MESSAGE:
        return {
            ...state,
            errorMessage: action.payload
        };
    case UPDATE_PASSWORD:
        return {
            ...state,
            password: action.payload
        };
    case UPDATE_CONFIRMED_PASSWORD:
        return {
            ...state,
            confirmedPassword: action.payload
        };
    case UPDATE_FETCH_ERROR:
        return {
            ...state,
            fetchError: action.payload
        };
    case UPDATE_LOADING:
        return {
            ...state,
            loading: action.payload
        };
    case UPDATE_PASSWORDS_MATCH:
        return {
            ...state,
            passwordsMatch: action.payload
        };
    case UPDATE_PASSWORDS_VALID:
        return {
            ...state,
            passwordsValid: action.payload
        };
    default: 
        return state;
    }
};

export default ChangePasswordReducer;