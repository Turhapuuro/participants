"use strict"

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

// Routes and reducers
import {participantsReducers} from './reducers/participantsReducers';
import routes from './routes';

// Create store
const middleware = applyMiddleware(thunk) 
// Pass the initial state from the server store
const initialState = window.INITIAL_STATE;
const store = createStore(participantsReducers, initialState, middleware);

const Routes = (
    <Provider store={store}>
        {routes}
    </Provider>
);

render(
    Routes, document.getElementById('app')
);

