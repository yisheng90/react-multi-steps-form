import React from 'react';
import BaseField from './fieldComponent/baseField';
import DropdownField from './fieldComponent/dropdownField';
import RadioButtonField from './fieldComponent/radioButtonField';
import BaseForm from './baseForm'

class FamilyDetailsForm extends BaseForm {
    constructor(props) {
        super(props);
        this.formFields = ['isSpouseTravelling', 'spouseName', 'noOfChildren'];
        this.header = "Your Travel Companions";
        this.state = {
            formErrors: {},
            isSpouseTravelling: this.props.data.isSpouseTravelling,
            noOfChildren: this.props.data.noOfChildren,
            spouseName: this.props.data.spouseName,
        }
    }

    validateData(data) {
        if (this.state.isSpouseTravelling === "No") {
            data = (({isSpouseTravelling, noOfChildren}) => ({isSpouseTravelling, noOfChildren}))(data)
        }

        return super.validateData(data)
    }

    getAvailableFields() {
        let component = this;
        return this.formFields.reduce((acc, fieldName) => {
            switch (fieldName) {
                case "isSpouseTravelling":
                    acc.push(<RadioButtonField options={['Yes', 'No']} name="isSpouseTravelling"
                                               label="Is Your Spouse Travelling?"
                                               className="inline-radio" saveState={component.saveState}
                                               value={component.state[fieldName]}
                                               errorMessage={this.state.formErrors.isSpouseTravelling}/>)
                    break;
                case "spouseName":
                    if (component.state.isSpouseTravelling === "Yes") {
                        acc.push(<BaseField type="text"
                                            name="spouseName"
                                            placeholder="Your Spouse Name"
                                            label="Your Spouse Name"
                                            saveState={component.saveState}
                                            value={component.state[fieldName]}
                                            errorMessage={this.state.formErrors.spouseName}
                        />);
                    }
                    break;
                case "noOfChildren":
                    let options = Array.from({length: 21}, (item, index) => index);
                    acc.push(<DropdownField label="No of Children Travelling"
                                            options={options}
                                            placeholder="Please Select No of Children"
                                            name="noOfChildren"
                                            saveState={component.saveState}
                                            value={component.state[fieldName]}
                                            errorMessage={this.state.formErrors.noOfChildren}
                    />)
                    break;
                default:
                    return;
            }
            return acc;
        }, []);
    }

}


export default FamilyDetailsForm;
