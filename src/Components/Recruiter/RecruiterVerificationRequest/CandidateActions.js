import * as Types from './CandidateActionTypes';

export const changeView = (view) => {
    return function (dispatch) {
        dispatch({
            type: Types.SWITCH_VIEW,
            payload: view            
        });
    };
};