import React from 'react';
import BaseField from './baseField'

class DateField extends BaseField {
    constructor(props) {
        super(props);
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    handleDateChange(e) {
        this.props.saveDate(this.props.index, e.target.value)
    }

    render() {
        return (
            <div className="col-md-4">
                <input type="date" className="form-control" placeholder="Travel Date"
                       value={this.props.value}
                       onChange={this.handleDateChange}/>
                {this.getErrorMessageElement()}
            </div>
        )
    }
}

export default DateField;