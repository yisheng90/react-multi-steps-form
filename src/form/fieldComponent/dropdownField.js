import React from 'react';
import BaseField from './baseField'

class DropdownField extends BaseField {
    getErrorMessageElement(message) {
        if (!this.props.hasError && !message) return null;
        return (
            <small className="error text-red">
                {message || "This field is invalid."}
            </small>
        )
    }

    getOptionField(checkedValue) {
        if (!Array.isArray(this.props.options)) return null;
        let options = this.props.options.map((option) => {
            let key = `optionfield-${option}`;
            let isSelected = option == checkedValue ? "selected" : ''
            return <option value={option} key={key} selected={isSelected}>{option}</option>
        })
        if (this.props.placeholder) options.unshift(<option value=""
                                                            key="optionfield-placeholder">{this.props.placeholder}</option>)
        return options;
    }

    render() {
        return (
            <div class="field-container">
                {this.getLabelElement(this.props.label)}
                <select type="text" className="form-control" ref={this.props.name} name={this.props.name}
                        onChange={this.props.saveState}>
                    {this.getOptionField(this.props.value)}
                </select>
                {this.getErrorMessageElement(this.props.errorMessage)}
            </div>
        );
    }
}

export default DropdownField;