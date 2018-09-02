import React from 'react';
import Script from 'react-load-script';
import BaseField from './baseField'

const key = process.env.REACT_APP_GOOGLE_KEY
const googleMapURL = `//maps.googleapis.com/maps/api/js?key=${key}&libraries=places`;

class DateField extends BaseField {
    constructor(props) {
        super(props)
        this.autocomplete = null;
        this.id = `${this.props.type}-${this.props.index}`;
        this.handleScriptLoad = this.handleScriptLoad.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
    }

    componentDidMount() {
        let element = document.getElementById(this.id);
        element.value = this.props.value
    }

    componentDidUpdate(prevProps, prevState) {
        let element = document.getElementById(this.id);
        element.value = this.props.value
    }

    handleScriptLoad() {
        let element = document.getElementById(this.id);
        this.autocomplete = new window.google.maps.places.Autocomplete(element, {types: ['(cities)']});
        this.autocomplete.addListener('place_changed', this.handleLocationChange);
    }

    handleLocationChange() {
        let addresses = this.autocomplete.getPlace();
        let address = addresses.address_components;
        if (address) {
            this.props.saveLocation(this.props.index, this.props.type, address[0].long_name);
        }
    }

    render() {
        return (
            <div className="col-md-4">
                <Script url={googleMapURL}
                        onLoad={this.handleScriptLoad}/>
                <input type="text" className="form-control" name={this.props.type} id={this.id} key={this.id}
                       placeholder={this.props.label}/>
                {this.getErrorMessageElement()}
            </div>
        )
    }
}


export default DateField;