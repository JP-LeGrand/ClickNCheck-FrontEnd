import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from '../Components/Shared/Login/Login';
import Otp from '../Components/Shared/Otp/Otp';
import ReviewChecks from '../Recruiter/RecruiterVerificationRequest/ReviewChecks';
import Consent from '../Components/Candidate/Consent/Consent';
import Consented from '../Components/Candidate/Consented/Consented';
import ForgotPassword from '..//Components/Shared/ForgotPassword/ForgotPassword';
import React from 'react';
import ChangePassword from '../Components/Shared/ChangePassword/ChangePassword';
import ForgotPasswordSuccess from '../Components/Shared/ForgotPasswordSuccess/ForgotPasswordSuccess';
import MainContainer from '../Recruiter/RecruiterVerificationRequest/MainContainer';
const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/otp" exact component={Otp}/>
                <Route path="/candidate/consent" exact component={Consent} />
                <Route path="/candidate/consented" exact component={Consented} />
                <Route path="/forgotPassword" exact component={ForgotPassword} />
                <Route path="/forgotPasswordSuccess" exact component={ForgotPasswordSuccess} />
                <Route path="/changePassword" exact component={ChangePassword} />
                <Route path="/ReviewChecks" exact component={ReviewChecks} />
                <Route path="/candidate/bulk" exact component={MainContainer} />
                <Route render={() => <Redirect to="/"/>}/>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;