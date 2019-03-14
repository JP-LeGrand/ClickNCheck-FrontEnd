import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import React from 'react';
import Login from '../Components/Shared/Login/Login';
import Otp from '../Components/Shared/Otp/Otp';
import ReviewChecks from '../Components/Recruiter/RecruiterVerificationRequest/ReviewChecks';
import Consent from '../Components/Candidate/Consent/Consent';
import Consented from '../Components/Candidate/Consented/Consented';
import ForgotPassword from '../Components/Shared/ForgotPassword/ForgotPassword';
import ChangePassword from '../Components/Shared/ChangePassword/ChangePassword';
import ForgotPasswordSuccess from '../Components/Shared/ForgotPasswordSuccess/ForgotPasswordSuccess';
import MainContainer from '../Components/Recruiter/RecruiterVerificationRequest/MainContainer';
import NavBar from '../Components/Recruiter/NavBar/NavBar';

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