import React from 'react';
import './radioButtonField.css';
import BaseField from './baseField'

class RadioButtonField extends BaseField {
    getOptionField(name, handleEvent, selectedValue) {
        if (!Array.isArray(this.props.options)) return null;
        return this.props.options.map((option) => {
            let id = `${name}-${option}`;
            let key = `${id}-key`
            let labelKey = `${id}-label`;
            let wrapperKey = `${id}-wrapper`;
            let  isChecked = selectedValue === option ? "checked" : '';
            return (
                <span key={wrapperKey}>
                    <input type="radio" className="form-control" name={name} ref={name} id={id} value={option} key={key}
                           checked={isChecked} onClick={handleEvent}/><label key={labelKey} htmlFor={id}>{option}</label>
                </span>
            )
        })
    }

    render() {
        return (
            <div className="form-group">
                {this.getLabelElement(this.props.label)}
                <div className={this.props.className}>
                    {this.getOptionField(this.props.name, this.props.saveState, this.props.value)}
                </div>
                {this.getErrorMessageElement(this.props.errorMessage)}
            </div>
        );
    }
}

export default RadioButtonField;