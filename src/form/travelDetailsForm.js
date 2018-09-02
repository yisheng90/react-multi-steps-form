import React from 'react';
import ItineraryField from './fieldComponent/itineraryField';
import BaseForm from "./baseForm";

class TravelDetailsForm extends BaseForm {
    constructor(props) {
        super(props);
        this.autocomplete = null;
        this.state = {
            formErrors: [],
            itineraries: (Array.isArray(this.props.data.itineraries) && this.props.data.itineraries.length > 0) ? this.props.data.itineraries : [{
                fromLocation: '',
                toLocation: '',
                date: '',
                errors: [],
            }],
        }
        this.saveAndContinue = this.saveAndContinue.bind(this);
        this.addItinerary = this.addItinerary.bind(this);
        this.removeItinerary = this.removeItinerary.bind(this);
        this.saveLocation = this.saveLocation.bind(this);
        this.saveDate = this.saveDate.bind(this);
    }

    validateItineraries() {
        let hasError = false
        let itinereries = this.state.itineraries.map((itinerary) => {
            let errors = ['fromLocation', 'toLocation', 'date'].filter((item) => !itinerary[item]);
            if (errors.length > 0) hasError = true;
            itinerary.errors = errors;
            return itinerary;
        });

        this.setState({
            itineraries: itinereries
        })

        return !hasError;
    }

    saveAndContinue(e) {
        e.preventDefault();
        if (this.validateItineraries()) {
            this.props.saveValues({itineraries: this.state.itineraries})
            this.props.nextStep();
        }
    }

    addItinerary(e) {
        e.preventDefault();
        let itineraries = this.state.itineraries
        itineraries.push({
            fromLocation: '',
            toLocation: '',
            date: ''
        });

        this.setState({
            itineraries: itineraries
        })
    }

    removeItinerary(e) {
        e.preventDefault();
        let itineraries = this.state.itineraries;
        itineraries.splice(e.target.dataset.value, 1);
        this.setState({
            itineraries: itineraries
        })
    }

    saveLocation(index, type, location) {
        let itineraries = this.state.itineraries;
        let targetedItinerary = itineraries[index];
        targetedItinerary[type] = location;
        itineraries[index] = targetedItinerary;
        this.setState({
            itineraries: itineraries
        })
    }

    saveDate(index, date) {
        let itineraries = this.state.itineraries;
        let targetedItinerary = itineraries[index];
        targetedItinerary.date = date;
        itineraries[index] = targetedItinerary;
        this.setState({
            itineraries: itineraries
        })
    }

    getItineraries() {
        let allowRemoval = this.state.itineraries.length > 1;
        return this.state.itineraries.map((itinerary, index) => {
            return <ItineraryField allowRemoval={allowRemoval} index={index}
                                   value={itinerary}
                                   saveLocation={this.saveLocation}
                                   saveDate={this.saveDate}
                                   removeItinerary={this.removeItinerary}/>
        })
    }


    render() {
        console.log("data", this.state)
        return (
            <div className="form-container">
                <h1>Your Itineraries</h1>
                <span>  <button className="btn btn-transparent float-left link float-left"
                                onClick={this.addItinerary}>
                    Add Itinerary
                </button></span>
                <div className="itineraries-container">
                    {this.getItineraries()}
                </div>

                <div className="navigator-container white-background">
                    <button className="btn btn-transparent text-voilet float-left" onClick={this.props.previousStep}>
                        Back
                    </button>
                    <button className="btn btn-transparent text-voilet float-right" onClick={this.saveAndContinue}>Submit
                    </button>
                </div>

            </div>
        );
    }
}


export default TravelDetailsForm;
