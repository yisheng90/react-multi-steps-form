import React, {Component} from 'react';
import '../form/index.css'
import './summary.css';

class Summary extends Component {
    displaySpouseNameField() {
        if (this.props.data.isSpouseTravelling === "Yes") {
            return (<p>Spouse Name: {this.props.data.spouseName}</p>)
        }
        return null;
    }

    displayItinerariesHeaders() {
        return (
            <div className="row">
                <div className="col-md-4">
                    <span className="d-none d-sm-block"> Travel Date</span>
                </div>
                <div className="col-md-4">
                    <span className="d-none d-sm-block"> Origin</span>
                </div>
                <div className="col-md-4">
                    <span className="d-none d-sm-block">Destination</span>
                </div>
            </div>
        )
    }

    displayItineraries() {
        if (!Array.isArray(this.props.data.itineraries) || this.props.data.itineraries.length === 0) {
            return (
                <div className="row">
                    <div className="col-md-12">
                        You have not submit any itinerary.
                    </div>
                </div>
            );
        }
        let itineraries = this.props.data.itineraries.map((itinerary, index) => {
            return (
                <div className="row">
                    <div className="col-md-12 d-block d-sm-none">
                        Itinerary {index + 1}
                    </div>
                    <div className="col-md-4">
                        <span className="d-block d-sm-none">Date : {itinerary.date}</span>
                    </div>
                    <div className="col-md-4">
                        <span className="d-block d-sm-none">Origin : {itinerary.fromLocation}</span>
                    </div>
                    <div className="col-md-4">
                        <span className="d-block d-sm-none">Destination : {itinerary.toLocation}</span>
                    </div>
                </div>
            )
        })
        itineraries.unshift(this.displayItinerariesHeaders());
        return itineraries
    }

    render() {
        return (
            <div className="summary-container container">
                <h1 className="text-voilet text-center">Summary</h1>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title text-gold">Personal Information</h5>
                                <p>Name: {this.props.data.name}</p>
                                <p>Email: {this.props.data.email}</p>
                                <p>Phone Number: {this.props.data.phoneNumber}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title text-gold">Family Members</h5>
                                <p>Is Spouse Travelling: {this.props.data.isSpouseTravelling}</p>
                                {this.displaySpouseNameField()}
                                <p>No of Children Travelling: {this.props.data.noOfChildren}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title text-gold">Itineraries</h5>
                                {this.displayItineraries()}
                            </div>
                        </div>

                    </div>
                </div>
                <div className="navigator-container">
                    <button className="btn btn-transparent text-voilet" onClick={this.props.restart}>Restart
                    </button>
                </div>
            </div>
        )
    }
}


export default Summary;
