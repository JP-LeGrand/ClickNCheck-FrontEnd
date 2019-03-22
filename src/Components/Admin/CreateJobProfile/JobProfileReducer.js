import InitialState from '../../../Shared/State/InitialState';
import * as Types from './JobProfileTypes';

const JobProfileReducer = (state = InitialState.verificationChecksState, action) => {
    switch (action.type) {
    case Types.FETCH_JOB_PROFILES:
        return {
            ...state,
            jobProfiles: action.payload
        };
    case Types.UPDATE_SELECTED_PROFILE:
        return {
            ...state,
            selectedProfile: action.payload
        };
    case Types.FETCH_ALL_CHECKS:
        return {
            ...state,
            allChecks: action.payload
        };
    case Types.UPDATE_DISPLAY:
        return {
            ...state,
            nowDisplaying: action.payload
        };
    case Types.UPDATE_SELECTED_CHECKS:
        return {
            ...state,
            selectedChecks: action.payload
        };
    case Types.UPDATE_CODE:
        return {
            ...state,
            code: action.payload
        };
    default: 
        return state;
    }
};

export default JobProfileReducer;