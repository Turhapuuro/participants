"use strict"
import React from 'react';
import {Row, Grid, Col, Form, FormGroup, FormControl} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {findDOMNode} from 'react-dom';

import Input from './input';
import {postParticipant} from '../actions/participantsActions';


class NewParticipantForm extends React.Component{

   constructor(){
        super();
        this.state = {
            name: '',
            email: '',
            phone: '',
            disabled: true
        }
        this.getValidationState = this.getValidationState.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        const newParticipant = {
            name: this.state.name,
            email: this.state.email.toLowerCase(),
            phone: this.state.phone,
        };
        this.props.postParticipant(newParticipant);

        this.setState({
            name: '',
            email: '',
            phone: ''
        })
        e.preventDefault();
    }

    getValidationState() {
        const length = 12;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
    }
    
    componentWillUpdate(nextProps, nextState) {
        if ((this.state.name.length < 5 || this.state.email.length < 10
                 || this.state.phone.length < 6) && this.state.disabled === false) {
                     nextState.disabled = true;
                 } 
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.name.length >= 5 && prevState.email.length >= 10 &&
             prevState.phone.length >= 6 && prevState.disabled === true){
                this.setState({
                    disabled: false
                })
             }
    }


    handleChange(name, value){
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <Row className="form-container">
                <Form inline>
                        <Input inputName="name" id="name-form"
                        placeholder="Full name"
                        value={this.state.name}
                        onChange={this.handleChange}
                        emailValidation={false} />
                        <Input inputName="email" id="email-form"
                            placeholder="E-mail address"
                            value={this.state.email}
                            onChange={this.handleChange}
                            emailValidation={true}  />
                        <Input inputName="phone" id="phone-form"
                            placeholder="Phone number"
                            value={this.state.phone}
                            onChange={this.handleChange}
                            emailValidation={false}  />
                        <FormGroup>
                            <button 
                                disabled={this.state.disabled} 
                                className={this.state.disabled ? "form-button" : 
                                    "form-button form-button-active"} 
                                onClick={(e) => this.handleSubmit(e)}>
                                Add new                       
                            </button>
                        </FormGroup>
                </Form>   
            </Row> 
        );
    }
};

function mapStateToProps(state){
    return {
        participants: state.participants
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        postParticipant
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(NewParticipantForm);