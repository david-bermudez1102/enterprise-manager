import React, { Component } from "react";
import { connect } from "react-redux";
import SelectableOptions from "./SelectableOptions";

class RadioField extends Component {
  handleChange = event => {
    const {
      handleChange,
      handleSelectableChange,
      selectableResourceAttributes
    } = this.props;
    handleChange(event);
    handleSelectableChange(
      {
        ...selectableResourceAttributes,
        _destroy: 1
      },
      []
    );
    this.props.handleKeyFieldChange({ resource_field_id: "" });
  };

  render() {
    const {
      field,
      handleSelectableChange,
      selectableResourceAttributes,
      fieldType
    } = this.props;
    return (
      <>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="field_type"
            id="radio_field"
            value="radio"
            onChange={this.handleChange}
            defaultChecked={fieldType === "radio" ? true : false}
          />
          <label htmlFor="radio_field" className="form-check-label">
            Radio Field <i className="fad fa-circle text-primary"></i>
          </label>
        </div>
        {fieldType === "radio" ? (
          <SelectableOptions
            field={field}
            fieldType={fieldType}
            handleSelectableChange={handleSelectableChange}
            selectableResourceAttributes={selectableResourceAttributes}
          />
        ) : null}
      </>
    );
  }
}
const mapStateToProps = ({ fields }) => {
  return { fields };
};

export default connect(mapStateToProps)(RadioField);
