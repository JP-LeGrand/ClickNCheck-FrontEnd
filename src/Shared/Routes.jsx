import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from '../Components/Home/Home';
import ReviewChecks from '../Recruiter/RecruiterVerificationRequest/ReviewChecks';
import Consent from '../Components/Candidate/Consent/Consent';
import Consented from '../Components/Candidate/Consented/Consented';
import ForgotPassword from '..//Components/Shared/ForgotPassword/ForgotPassword';
import React from 'react';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/candidate/consent" exact component={Consent} />
                <Route path="/candidate/consented" exact component={Consented} />
                <Route path="/forgotPassword" exact component={ForgotPassword} />
                <Route path="/ReviewChecks" exact component={ReviewChecks} />
                <Route render={() => <Redirect to="/"/>}/>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;