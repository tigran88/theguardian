import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

import './index.css';
import App from './App';

axios.defaults.baseURL = 'https://content.guardianapis.com/';

axios.interceptors.request.use((config) => ({
    ...config,
    params: {
        'api-key': 'test',
        ...config.params
    }
}));

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
