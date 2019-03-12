import InitialState from '../../Shared/State/InitialState';
import * as Types from './LoginActionTypes';

export default (state = InitialState.LoginState, action) => {
    switch (action.type) {
    case Types.LOGIN_REQUEST_INITIATED:
    case Types.LOGIN_REQUEST_SUCCEEDED:
    case Types.LOGIN_REQUEST_FAILED:
        return {
            ...state,
            ...action.LoginState
        };
    default:
        return state;
    }
};