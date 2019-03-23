import { combineReducers } from 'redux';
import HomeReducer from '../../Components/Home/HomeReducer';
import ConsentReducer from '../../Components/Candidate/Consent/ConsentReducer';
import ForgotPasswordReducer from '../../Components/Shared/ForgotPassword/ForgotPasswordReducer';
import ChangPasswordReducer from '../../Components/Shared/ChangePassword/ChangePasswordReducer';
import ReviewChecksReducer from '../../Components/Recruiter/RecruiterVerificationRequest/ReviewChecksReducer';
import CandidateReducer from '../../Components/Recruiter/RecruiterVerificationRequest/CandidateReducer';
const RootReducer = combineReducers({
    homeState: HomeReducer,
    consentState: ConsentReducer,
    forgotPasswordState: ForgotPasswordReducer,
    changePasswordState: ChangPasswordReducer,
    reviewChecksState: ReviewChecksReducer,
    candidateState: CandidateReducer
});

export default RootReducer;