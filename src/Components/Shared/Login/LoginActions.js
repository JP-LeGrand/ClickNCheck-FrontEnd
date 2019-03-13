import * as Types from './LoginActionTypes';

export const fetchInitiatedAC = () => {
    return {
        type: Types.LOGIN_REQUEST_INITIATED,
        LoginState: {
            loading: true
        }
    };
};

export const fetchSucceededAC = (data) => {
    return {
        type: Types.LOGIN_REQUEST_SUCCEEDED,
        LoginState: {
            loading: false,
            ...data
        }
    };
};

export const fetchFailedAC = (err) => {
    return {
        type: Types.LOGIN_REQUEST_FAILED,
        LoginState: {
            loading: false,
            errorMessage: err
        }
    };
};

export const fetchData = (someParameters) => async (dispatch) => {
    dispatch(fetchInitiatedAC());
    try {
        const response = await API.someDataFetchingFunction(someParameters);
        dispatch(fetchSucceededAC(response.data));
    } catch (err) {
        dispatch(fetchFailedAC(err));
    }
};