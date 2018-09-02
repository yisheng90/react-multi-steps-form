import React, {Component} from 'react';
import './baseField.css';

class BaseField extends Component {
    getErrorMessageElement(message) {
        if (!this.props.hasError && !message) return null;
        return (
            <small className="error text-red float-right">
                {message || "This field is invalid."}
            </small>
        )
    }


    getLabelElement(label, className = []) {
        if (!label) return null;
        return <label className={className.join(' ')}>{label}</label>
    }

    render() {
        return (
            <div className="field-container">
                {this.getLabelElement(this.props.label)}
                <input type={this.props.type} className="form-control" ref={this.props.name} name={this.props.name}
                       value={this.props.value} placeholder={this.props.placeholder} onChange={this.props.saveState}/>
                {this.getErrorMessageElement(this.props.errorMessage)}
            </div>
        )
    }
}

export default BaseField;