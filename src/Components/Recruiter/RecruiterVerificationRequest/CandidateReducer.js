import InitialState from '../../../Shared/State/InitialState';
import * as Types from './CandidateActionTypes';

const CandidateReducer = (state = InitialState.candidateState, action) => {
    switch (action.type) {
    case Types.SWITCH_VIEW : 
        return {
            ...state,
            displayCandidate: action.payload
        };

    default:
        return state;
    }
};

export default CandidateReducer;