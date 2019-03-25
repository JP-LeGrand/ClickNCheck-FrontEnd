import * as Types from './CandidateActionTypes';

export const changeView = (view) => {
    return function (dispatch) {
        dispatch({
            type: Types.SWITCH_VIEW,
            payload: view            
        });
    };
};

export const updateArray = (body) => {
    return function (dispatch) {
        dispatch({
            type: Types.SUBMIT_CANDIDATE,
            payload: body
        });
    };
};