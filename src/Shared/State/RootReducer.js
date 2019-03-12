import { combineReducers } from 'redux';
import HomeReducer from '../../Components/Home/HomeReducer';
import ConsentReducer from '../../Components/Candidate/Consent/ConsentReducer';
import ChangePasswordReducer from '../../Components/Shared/ChangePassword/ChangePasswordReducer';
const RootReducer = combineReducers({
    homeState: HomeReducer,
    consentState: ConsentReducer,
    changePasswordState: ChangePasswordReducer
});

export default RootReducer;