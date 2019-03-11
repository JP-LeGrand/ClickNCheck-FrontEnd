import { combineReducers } from 'redux';
import HomeReducer from '../../Components/Home/HomeReducer';
import ConsentReducer from '../../Components/Candidate/Consent/ConsentReducer';
const RootReducer = combineReducers({
    homeState: HomeReducer,
    consentState: ConsentReducer
});

export default RootReducer;