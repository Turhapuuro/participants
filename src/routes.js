"use strict"

import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

// IMPORT ROUTES
import Main from './main';
import ParticipantList from './components/participantList';

const routes = (
    <Router history={browserHistory}>
        <Route path='/' component={Main}>
            <IndexRoute component={ParticipantList}/>
        </Route>
    </Router>
)

export default routes;

