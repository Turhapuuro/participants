"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Form, Table} from 'react-bootstrap'; 

import TableContents from './tableContents';
import NewParticipantForm from './newParticipantForm';
import {sortParticipants} from '../actions/participantsActions';

class ParticipantList extends React.Component{

    handleSorting(e){
        var sortableList = this.props.participants;

        function compare(a,b) {
            if (a[e.target.id] < b[e.target.id])
                return -1;
            if (a[e.target.id] > b[e.target.id])
                return 1;
            return 0;
        }

        sortableList.sort(compare);
        this.props.sortParticipants(sortableList);
    }

    render() { 
        return (
            <div className="container top-container">
                <h3>List of participants</h3>
                <div className="container list-container">
                    <div className="row">
                        <NewParticipantForm />
                    </div>
                <div className="row table-container">
                <Form inline>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th id="name-header">
                                    <span id="name" 
                                        onClick={(e) => this.handleSorting(e)}>
                                        Name
                                    </span>
                                </th>
                                <th>
                                    <span id="email"
                                        onClick={(e) => this.handleSorting(e)} >
                                        E-mail address
                                    </span>
                                </th>
                                <th>
                                    <span id="phone"
                                        onClick={(e) => this.handleSorting(e)} >
                                        Phone number
                                    </span>
                                </th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                           <TableContents />
                    </Table>
                </Form>                  
                </div>
            </div>
        </div>
    )};
};

function mapStateToProps(state){
    return {
        participants: state.participants
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        sortParticipants
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (ParticipantList);
