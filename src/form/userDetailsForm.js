import React from 'react';
import BaseField from './fieldComponent/baseField';
import BaseForm from './baseForm'

class UserDetailsForm extends BaseForm {
    constructor(props) {
        super(props);
        this.header = "Your Personal Information";
        this.formFields = ['name', 'email', 'phoneNumber'];
        this.state = {
            name: this.props.data.name,
            email: this.props.data.email,
            phoneNumber: this.props.data.phoneNumber,
            formErrors: {}
        }
    }

    getAvailableFields() {
        let component = this;
        return this.formFields.reduce((acc, fieldName) => {
            let label = null;
            let type = "text";
            switch (fieldName) {
                case "name":
                    label = "Name";
                    break;
                case "email":
                    label = "Email";
                    type = "email";
                    break;
                case "phoneNumber":
                    label = "Phone Number";
                    break;
                default:
                    return;
            }
            if (label) {
                acc.push(<BaseField type={type}
                                    name={fieldName}
                                    placeholder={label}
                                    label={label}
                                    saveState={component.saveState}
                                    value={component.state[fieldName]}
                                    errorMessage={component.state.formErrors[fieldName]}/>)
            }

            return acc;
        }, []);
    }
}


export default UserDetailsForm;
