import React, { Component } from "react";
import { connect } from "react-redux";
import cuid from "cuid";

class RecordKeyField extends Component {
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
    const { fieldType, resourceId } = this.props;
    const fields = this.props.fields.filter(
      f => f.formId === resourceId && f.fieldType === "selectable"
    );
    return (
      <>
        <div className="col-auto order-first my-auto">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="fieldType"
              id="record_key_field"
              value="keyField"
              onChange={this.handleChange}
              checked={fieldType === "key_field" ? true : false}
            />
            <label htmlFor="record_key_field" className="form-check-label">
              Key Field{" "}
              <i className="fas fa-key" style={{ color: "#07689F" }}></i>
            </label>
          </div>
        </div>
        {fieldType === "keyField" ? (
          <div className="col-12 order-last">
            <hr />
            <div className="form-group">
              <select
                onChange={this.handleFieldChange}
                value={this.state.fieldId}
                className="form-control">
                <option value="">Select a field</option>
                {fields.map(field => (
                  <option key={cuid()} value={field.id}>
                    {field.name}
                  </option>
                ))}
              </select>
              <label className="form-control-placeholder">Grouped by</label>
            </div>
            <p
              className="small text-muted text-justify"
              style={{ lineHeight: "16px" }}>
              The key field won't be visible in the form. It will be assigned
              automatically whenever a new record is submitted.
            </p>
          </div>
        ) : null}
      </>
    );
  }
}
const mapStateToProps = ({ fields }) => {
  return { fields };
};

export default connect(mapStateToProps)(RecordKeyField);
