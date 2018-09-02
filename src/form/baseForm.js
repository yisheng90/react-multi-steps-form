import React, {Component} from 'react';
import BaseField from './fieldComponent/baseField';
import './index.css'

class BaseForm extends Component {
    constructor(props) {
        super(props);
        this.formFields = [];
        this.state = {
            hasError: false,
            formErrors: [],
        }
        this.saveAndContinue = this.saveAndContinue.bind(this)
        this.saveState = this.saveState.bind(this);
    }


    validates(value, regex, fieldName) {
        if (!value) {
            return `${fieldName} is required.`;
        } else if (regex && !value.match(regex)) {
            return `${fieldName} is invalid.`;
        }
    }

    saveState(e) {
        let data = {};
        data[e.target.name] = e.target.value;
        this.setState(data)
    }

    saveAndContinue(e) {
        e.preventDefault();
        let component = this;
        let data = component.formFields.reduce((acc, fieldName) => {
            acc[fieldName] = component.state[fieldName]
            return acc
        }, {});

        if (this.validateData(data)) {
            this.props.saveValues(data);
            this.props.nextStep();
        }
    }

    validateData(data) {
        let component = this;


        let errors = Object.keys(data).reduce((acc, key) => {
            let err = null
            switch (key) {
                case 'email':
                    err = component.validates(data[key], /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i, 'Email');
                    break;
                case 'phoneNumber':
                    err = component.validates(data[key], /^([0-9]{8})$/, 'Phone Number');
                    break;
                case "name":
                case "spouseName":
                    err = component.validates(data[key], /[A-z]/g, 'Spouse Name');
                    break;
                default:
                    err = component.validates(data[key], null, 'This field')
                    break;
            }
            if (err) acc[key] = err;
            return acc;
        }, {});
        this.setState({formErrors: errors});
        return Object.keys(errors).length === 0;
    }

    getAvailableFields() {
        let component = this;
        return this.formFields.reduce((acc, fieldName) => {
            acc.push(<BaseField type={fieldName}
                                name={fieldName}
                                placeholder={fieldName}
                                label={fieldName}
                                saveState={component.saveState}
                                value={component.state[fieldName]}
                                errorMessage={component.state.formErrors[fieldName]}/>)

            return acc;
        }, []);
    }

    getBackButton() {
        if (this.props.isEntryPoint) return null;
        return ( <button className="btn btn-transparent text-gold float-left" onClick={this.props.previousStep}>
            Back
        </button>)
    }

    render() {
        return (
            <div className="form-container">
                <h1 className="text-center">{this.header}</h1>
                <form>
                    {this.getAvailableFields()}
                </form>
                <div className="navigator-container">
                    {this.getBackButton()}
                    <button className="btn btn-transparent text-gold float-right" onClick={this.saveAndContinue}>Next
                    </button>
                </div>

            </div>
        );
    }
}


export default BaseForm;

