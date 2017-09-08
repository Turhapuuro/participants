"use strict"

import React from 'react';
import {Grid, Navbar} from 'react-bootstrap';

class Main extends React.Component{
    render(){
        return (
            <Grid>
                <Navbar>
                    <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">THS Software</a>
                    </Navbar.Brand>
                    </Navbar.Header>
                </Navbar>
                {this.props.children}
             </Grid>
        )
    }
}

export default Main;