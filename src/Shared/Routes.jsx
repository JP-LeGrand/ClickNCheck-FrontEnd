import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from '../Components/Home/Home';
import CaptureCandidateDetails from '../Recruiter/RecruiterVerificationRequest/CaptureCandidateDetails';
import ReviewChecks from '../Recruiter/RecruiterVerificationRequest/ReviewChecks';
import React from 'react';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={CaptureCandidateDetails}/>
                <Route path="/ReviewChecks"  component={ReviewChecks}/>
                <Route render={() => <Redirect to="/"/>}/>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;