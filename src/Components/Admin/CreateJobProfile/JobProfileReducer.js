import InitialState from '../../../Shared/State/InitialState';
import * as Types from './JobProfileTypes';

const JobProfileReducer = (state = InitialState.verificationChecksState, action) => {
    console.log('Reducer '+action.type);
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
    default: 
        return state;
    }
};

export default JobProfileReducer;