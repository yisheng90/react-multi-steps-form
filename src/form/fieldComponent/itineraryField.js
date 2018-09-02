import React, {Component} from 'react';
import LocationField from './locationField';
import DateField from './dateField';

class ItineraryField extends Component {
    hasError(field) {
        return (Array.isArray(this.props.value.errors)) && this.props.value.errors.includes(field);
    }

    getRemovalButton() {
        if (this.props.allowRemoval) {
            return (
                <button className="btn btn-transparent text-gold float-right" data-value={this.props.index} onClick={this.props.removeItinerary}>
                    X
                </button>);
        }
        return null;
    }

    getErrorClass() {
        return (Array.isArray(this.props.value.errors) && this.props.value.errors.length > 0) && "text-red";
    }

    render() {
        return (
            <div className="row field-container">
                <div className="col-md-12">
                    <span className={this.getErrorClass()}>Itinerary {this.props.index + 1}</span>
                    {this.getRemovalButton()}
                </div>

                <LocationField label="From" type="fromLocation" index={this.props.index}
                               hasError={this.hasError("fromLocation")}
                               value={this.props.value.fromLocation}
                               saveLocation={this.props.saveLocation}/>
                <LocationField label="To" type="toLocation" index={this.props.index}
                               hasError={this.hasError("toLocation")}
                               value={this.props.value.toLocation}
                               saveLocation={this.props.saveLocation}/>
                <DateField index={this.props.index} value={this.props.value.date}
                           saveDate={this.props.saveDate} hasError={this.hasError("date")}/>
            </div>
        );
    }
}

export default ItineraryField;