import React from 'react';
import createReactClass from 'create-react-class';
import {FormGroup, FormControl, HelpBlock} from 'react-bootstrap';

class Input extends React.Component{

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    getValidationState() {
        const length = this.props.value.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
    }

    getEmailValidationState() {
        const email = this.props.value;
        if (email.length === 0) return null;
        if (email.indexOf('@') >= 0) return 'success';
        else if (email.indexOf('@') === -1) return 'error';
    }

    handleChange(e) {
        this.props.onChange(e.target.name, e.target.value);
    }

    render() {
       return ( <FormGroup validationState={this.props.emailValidation ? this.getEmailValidationState() :
                            this.getValidationState()}>
                    <FormControl id={this.props.id} type="text"
                        placeholder={this.props.placeholder}
                        name={this.props.inputName}
                        ref={this.props.inputRef} 
                        value={this.props.value}
                        onChange={this.handleChange}
                        maxLength={this.props.emailValidation ? "25" : "20"} required>
                    </FormControl>
                </FormGroup>
       )
    }
};

export default Input;