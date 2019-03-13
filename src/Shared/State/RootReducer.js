import { combineReducers } from 'redux';
import HomeReducer from '../../Components/Home/HomeReducer';
import ConsentReducer from '../../Components/Candidate/Consent/ConsentReducer';
import ForgotPasswordReducer from '../../Components/Shared/ForgotPassword/ForgotPasswordReducer';
import ChangPasswordReducer from '../../Components/Shared/ChangePassword/ChangePasswordReducer';
const RootReducer = combineReducers({
    homeState: HomeReducer,
    consentState: ConsentReducer,
    forgotPasswordState: ForgotPasswordReducer,
    changePasswordState: ChangPasswordReducer
});

export default RootReducer;