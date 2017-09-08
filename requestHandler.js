"use strict"

import React from 'react';
import {renderToString} from 'react-dom/server';
import axios from 'axios';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {match, RouterContext} from 'react-router';

// Import reducers and routes
import {participantsReducers} from './src/reducers/participantsReducers';
import routes from './src/routes';

function handleRender(req, res){
    axios.get('http://localhost:3001/participants')
        .then(function(response){
            // Create store on the server
            const store = createStore(participantsReducers, 
            {
                "participants":response.data
            }) 
            // Get initial state from the store
            const initialState = JSON.stringify(store.getState()).replace(/<\/script/g,
                '<\\/script').replace(/<!--/g, '<\\!--');
            // Implement React-Router on the server to intercept client requests
            // and define what to do with them
            const Routes = {
                routes: routes,
                location: req.url
            }
            match(Routes, function(error, redirect, props){
                if(error){
                    res.status(500).send("Error fulfilling the request");
                } else if (redirect){
                    res.status(302, redirect.pathname + redirect.search);
                } else if (props){
                    const reactComponent = renderToString(
                        <Provider store={store}>
                            <RouterContext {...props}/>
                        </Provider>
                    );
                    res.status(200).render('index', {
                        reactComponent, initialState})
                } else {
                    res.status(404).send("Not Found");
                }
            })
        })
        .catch(function(err){
            console.log("Initial Server-side Rendering Error", err);
        })
}

module.exports = handleRender;