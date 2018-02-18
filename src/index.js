import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {HashRouter , Switch} from 'react-router-dom'
import {Provider} from 'react-redux'
import {store} from './store'
// component
import Router from './routers'

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Router />
      </Switch>
    </HashRouter>
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
