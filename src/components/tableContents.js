"use strict"
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {findDOMNode} from 'react-dom';
import {Grid, Row, Col, Form, FormGroup, FormControl} from 'react-bootstrap';

import {getParticipants, deleteParticipant, updateParticipant} from '../actions/participantsActions';

class TableContents extends React.Component{

    constructor(){
        super();
        this.state = {
            editing: '',
            editableName: '',
            editableEmail: '',
            editablePhone: ''
        }
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount(){
        this.props.getParticipants();
    }

    handleDelete(_id) {
        this.props.deleteParticipant(_id);
    }

    handleEdit(item) {
        this.setState({
            editing: item._id,
            editableName: item.name,
            editableEmail: item.email,
            editablePhone: item.phone
        });
    }

    handleEditSubmit(e){
        e.preventDefault();
        const participant = {
            _id: this.state.editing,
            name: findDOMNode(this.refs.name).value,
            email: findDOMNode(this.refs.email).value.toLowerCase(),
            phone: findDOMNode(this.refs.phone).value
        }

        this.props.updateParticipant(participant)
        this.handleCancel(e);
    }

    handleCancel(e){
        e.preventDefault();
        this.setState({
            editing: '',
            editableName: '',
            editableEmail: '',
            editablePhone: ''
        })
    }

    render() {
        const TableItems = this.props.participants.map((item) =>{
            if (this.state.editing !== item._id){ 
                return (
                    <tr key={item._id}>
                        <td className="table-cell">{item.name}</td>
                        <td className="table-cell">{item.email}</td>
                        <td className="table-cell">{item.phone}</td>
                        <td>
                            <i className="fa fa-pencil fa-2x"
                                aria-hidden="true"
                                onClick={() => this.handleEdit(item)}>
                            </i>
                        </td>
                        <td>
                            <i  className="fa fa-trash fa-2x" 
                                aria-hidden="true" 
                                onClick={() => this.handleDelete(item._id)}>
                            </i>
                        </td>
                    </tr>
                )
            } else if (this.state.editing === item._id){
                return (
                    <tr key={this.state.editing}>
                        <td>
                            <FormControl id="name-form" type="text"
                                style={{marginLeft:"0px",width:"100%"}}
                                placeholder="Full name"
                                name="editingName" 
                                ref="name"
                                defaultValue={this.state.editableName}
                                required>
                            </FormControl>
                        </td>
                        <td>
                            <FormControl type="text"
                                placeholder="E-mail address"
                                name="editingEmail"
                                ref="email" 
                                defaultValue={this.state.editableEmail}
                                maxLength="25" required>
                            </FormControl> 
                        </td>
                        <td id="phone-edit" >
                            <FormControl
                                type="text"
                                placeholder="Phone number"
                                style={{width:"80%"}}
                                name="editingPhone" 
                                ref="phone"
                                defaultValue={this.state.editablePhone}
                                required>
                            </FormControl>
                        </td>
                        <td>
                            <i className="fa fa-times fa-2x" 
                                aria-hidden="true"
                                onClick={(e) => this.handleCancel(e)}>
                            </i>
                        </td>
                        <td>
                            <i className="fa fa-check fa-2x" 
                                aria-hidden="true"
                                onClick={(e) => this.handleEditSubmit(e)}>
                            </i>
                        </td>
                    </tr>
                )}
        });

        return <tbody>{TableItems}</tbody>;
    }
};

function mapStateToProps(state){
    return {
        participants: state.participants
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getParticipants,
        deleteParticipant,
        updateParticipant
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps) (TableContents);