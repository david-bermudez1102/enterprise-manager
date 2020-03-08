import React, { Component } from "react";
import { connect } from "react-redux";
import cuid from "cuid";
import SelectableOptions from "./SelectableOptions";

class RadioField extends Component {
  constructor(props) {
    super(props);
    const { field } = props;
    this.state = {
      fieldId:
        field && field.recordKey ? field.recordKey.resource_field_id : "",
      record_key_attributes: {
        resource_field_id:
          field && field.recordKey ? field.recordKey.resource_field_id : ""
      }
    };
  }

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
  };

  handleFieldChange = event => {
    event.persist();
    this.setState(
      {
        fieldId: event.target.value,
        record_key_attributes: { resource_field_id: event.target.value }
      },
      () => this.props.handleKeyFieldChange(this.state.record_key_attributes)
    );
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
