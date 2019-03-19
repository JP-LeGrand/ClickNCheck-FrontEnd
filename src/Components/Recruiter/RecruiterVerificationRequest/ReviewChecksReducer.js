import InitialState from '../../../Shared/State/InitialState';
import * as Types from './ReviewChecksActionTypes';

const ReviewChecksReducer = (state = InitialState.verificationChecksState, action) => {
    switch (action.type) {
    case Types.FETCH_CHECKS:
        return {
            ...state,
            jobProfileChecks: action.payload
        };
    case Types.TOGGLE_DISPLAY:
        return {
            ...state,
            displayChecks: action.payload ? false : true
        };
    case Types.ADD_JOB_PROFILE_CHECK:
        return {
            ...state,
            ...action.addJobProfileCheck
        };
    case Types.REMOVE_JOB_PROFILE_CHECK:
        return {
            ...state,
            ...action.removeJobProfileCheck
        };

    default: 
        return state;
    }
};

export default ReviewChecksReducer;