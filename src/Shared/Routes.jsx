import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Home from '../Components/Home/Home';
import Login from '../Components/Shared/Login/Login';
import React from 'react';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/login" exact component={Login}/>
                <Route render={() => <Redirect to="/"/>}/>
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;