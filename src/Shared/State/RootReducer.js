import { combineReducers } from 'redux';
import HomeReducer from '../../Components/Home/HomeReducer';
import ConsentReducer from '../../Components/Candidate/Consent/ConsentReducer';
import ForgotPasswordReducer from '../../Components/Shared/ForgotPassword/ForgotPasswordReducer';
const RootReducer = combineReducers({
    homeState: HomeReducer,
    consentState: ConsentReducer,
    forgotPasswordState: ForgotPasswordReducer
});

export default RootReducer;