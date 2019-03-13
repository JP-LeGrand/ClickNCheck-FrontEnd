import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './Shared/serviceWorker';
import { createAppState } from './Shared/State/AppState';
import { Provider } from 'react-redux';
import App from './Components/App/App';

ReactDOM.render(<Provider store={createAppState()}><App /></Provider>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();