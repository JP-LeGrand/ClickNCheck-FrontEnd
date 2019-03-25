import InitialState from "../../../Shared/State/InitialState";
import * as Types from './jobProfileActionTypes';

export default (state = InitialState.jobProfileState, action) => {
    switch (action.type) {
    case Types.JP_LOAD_RECRUITERS_SUCCESS:
    case Types.JP_LOAD_RECRUITERS_INITIATED:
    case Types.JP_LOAD_RECRUITERS_FAIL:
        return {
            ...state,
            ...action.jobProfileState
        }
    default: 
        return state;
    }
};