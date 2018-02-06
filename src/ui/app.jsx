import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';

import App from './components/App';
import Login from './components/Login';

ReactDOM.render((
    <HashRouter>
        <Switch>
            <Route exact path='/' component={App} onEnter={App.onEnter}/>
            <Route path='/login' component={Login}/>
        </Switch>
    </HashRouter>
), document.getElementById('app'));