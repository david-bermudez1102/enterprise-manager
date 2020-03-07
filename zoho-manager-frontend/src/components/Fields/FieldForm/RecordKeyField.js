import React, { Component } from "react";
import Icon from "@mdi/react";
import { mdiTextboxPassword } from "@mdi/js";
import { connect } from "react-redux";
import cuid from "cuid";

class RecordKeyField extends Component {
  constructor(props) {
    super(props);
    this.state = { fieldId: "", record_key_attributes: {} };
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
    const { fieldType, resourceId } = this.props;
    const fields = this.props.fields.filter(
      f => f.formId === resourceId && f.fieldType === "selectable"
    );
    return (
      <div className="form-check form-check-inline">
        <input
          className="form-check-input"
          type="radio"
          name="field_type"
          id="record_key_field"
          value="key_field"
          onChange={this.handleChange}
          defaultChecked={fieldType === "key_field" ? true : false}
        />
        <label htmlFor="record_key_field" className="form-check-label">
          Key Field{" "}
          <Icon
            path={mdiTextboxPassword}
            title="Key Field"
            size={2}
            color="#07689F"
          />
        </label>
        {fieldType === "key_field" ? (
          <select onChange={this.handleFieldChange} value={this.state.fieldId}>
            <option value="">Select a field</option>
            {fields.map(field => (
              <option key={cuid()} value={field.id}>
                {field.name}
              </option>
            ))}
          </select>
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = ({ fields }) => {
  return { fields };
};

export default connect(mapStateToProps)(RecordKeyField);
