import React, { Component } from 'react';
import './App.scss';
import Routes from '../../Shared/Routes';
import ReactAI from 'react-appinsights';

class App extends Component {
    render() {
        return (
            <Routes/>
        );
    }
}

export default ReactAI.withTracking(App);