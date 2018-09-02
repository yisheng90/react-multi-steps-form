import React, {Component} from 'react';
import UserDetailsForm from './userDetailsForm'
import FamilyDetailsForm from './familyDetails'
import TravelDetailsForm from './travelDetailsForm'
import Summary from '../summary/summary'

class Forms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            values: {},
        }
        this.saveValues = this.saveValues.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.previousStep = this.previousStep.bind(this);
        this.restart = this.restart.bind(this);
    }

    saveValues(data) {
        let currentValues = this.state.values
        Object.keys(data).forEach((key) => {
            currentValues[key] = data[key];
        })

        this.setState({values: currentValues});
    }

    nextStep() {
        let nextStep = this.state.step + 1;
        this.setState({step: nextStep})
    }

    previousStep() {
        let previousStep = this.state.step - 1;
        if (previousStep >= 0) {
            this.setState({step: previousStep})
        }
    }

    restart() {
        this.setState({step: 0, values: {}})
    }

    render() {
        switch (this.state.step) {
            case 0:
                return <UserDetailsForm data={this.state.values}
                                        saveValues={this.saveValues}
                                        nextStep={this.nextStep}
                                        isEntryPoint={true}
                                        previousStep={this.previousStep}/>
            case 1:
                return <FamilyDetailsForm data={this.state.values} saveValues={this.saveValues} nextStep={this.nextStep}
                                          previousStep={this.previousStep}/>
            case 2:
                return <TravelDetailsForm data={this.state.values} saveValues={this.saveValues} nextStep={this.nextStep}
                                          previousStep={this.previousStep}/>

            case 3:
                return <Summary data={this.state.values} restart={this.restart}/>
            default:
                return <UserDetailsForm data={this.state.values} saveValues={this.saveValues} nextStep={this.nextStep}
                                        previousStep={this.previousStep}/>
        }

    }
}

export default Forms;