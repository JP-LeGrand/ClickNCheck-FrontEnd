import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from '../Components/Home/Home';
import Login from '../Components/Shared/Login/Login';
import Consent from '../Components/Candidate/Consent/Consent';
import Consented from '../Components/Candidate/Consented/Consented';
import React from 'react';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route render={() => <Redirect to="/"/>}/>
                <Route path="/login" exact component={Login} />
                <Route path="/candidate/consent" exact component={Consent} />
                <Route path="/candidate/consented" exact component={Consented} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;