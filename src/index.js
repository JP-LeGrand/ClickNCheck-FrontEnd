import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './Shared/serviceWorker';
import { createAppState } from './Shared/State/AppState';
import { Provider } from 'react-redux';
import App from './Components/App/App';
import ReactAI from 'react-appinsights';
import { Router } from 'react-router-dom';
import history from './history';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactAI.init({ instrumentationKey:'fa2f4b1a-34ae-4964-9ec9-461b50c51e04', history });
ReactAI.setAppContext({ urlReferrer: document.referrer });
let appInsights = ReactAI.ai();
appInsights.trackPageView();
appInsights.trackEvent();
appInsights.trackException();
appInsights.trackMetric();
appInsights.trackDependency();
ReactDOM.render(
    <Provider store={createAppState()}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();