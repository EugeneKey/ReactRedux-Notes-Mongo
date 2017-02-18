import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
//import {browserHistory} from 'react-router';
//import {syncHistoryWithStore} from 'react-router-redux';

import configureStore from './store';

import App from './components/App.jsx';

const store = configureStore();
//const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('mount-point')
);
