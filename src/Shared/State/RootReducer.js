import { combineReducers } from 'redux';
import HomeReducer from '../../Components/Home/HomeReducer';
import ConsentReducer from '../../Components/Candidate/Consent/ConsentReducer';
import ForgotPasswordReducer from '../../Components/Shared/ForgotPassword/ForgotPasswordReducer';
import ChangPasswordReducer from '../../Components/Shared/ChangePassword/ChangePasswordReducer';
import ReviewChecksReducer from '../../Components/Recruiter/RecruiterVerificationRequest/ReviewChecksReducer';
import JobProfileReducer from '../../Components/Admin/CreateJobProfile/JobProfileReducer';
const RootReducer = combineReducers({
    homeState: HomeReducer,
    consentState: ConsentReducer,
    forgotPasswordState: ForgotPasswordReducer,
    changePasswordState: ChangPasswordReducer,
    reviewChecksState: ReviewChecksReducer,
    jobProfileState: JobProfileReducer
});

export default RootReducer;