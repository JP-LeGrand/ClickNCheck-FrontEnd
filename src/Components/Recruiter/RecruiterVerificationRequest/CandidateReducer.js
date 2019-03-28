import InitialState from '../../../Shared/State/InitialState';
import * as Types from './CandidateActionTypes';

const CandidateReducer = (state = InitialState.candidateState, action) => {
    switch (action.type) {
    case Types.SWITCH_VIEW : 
        return {
            ...state,
            displayCandidate: action.payload
        };
    case Types.SUBMIT_CANDIDATE : 
        return {
            ...state,
            candidateBody: action.payload
        };
    case Types.UPLOAD_FILE :
        return {
            ...state,
            fileState : action.payload    
        };

    case Types.FILE_SIZE :
        return {
            ...state,
            fileSize : action.payload
        };

    case Types.TABLE_VALID :
        return {
            ...state,
            tableValid: action.payload
        };
    case Types.CLEAR_TABLE : 
        return {
            ...state,
            tableValid : action.payload
        };

    case Types.ID_VALID : 
        return {
            ...state,
            idValid : action.payload
        };

    case Types.EMAIL_VALID : 
        return {
            ...state,
            emailValid : action.payload
        };

    default:
        return state;
    }
};

export default CandidateReducer;