import React from "react";
import { connect } from "react-redux";
import cuid from "cuid";
import { useHandleChange } from "../../Hooks/useHandleChange";

const RecordKeyField = props => {
  const { field, fieldType, resourceId, onChange } = props;
  const { handleChange, handleKeyFieldChange, state } = useHandleChange({
    field,
    onChange
  });
  const { recordKeyAttributes } = state;

  const fields = props.fields.filter(
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
            value="key_field"
            onChange={handleChange}
            checked={fieldType === "key_field" ? true : false}
          />
          <label htmlFor="record_key_field" className="form-check-label">
            Key Field{" "}
            <i className="fas fa-key" style={{ color: "#07689F" }}></i>
          </label>
        </div>
      </div>
      {fieldType === "key_field" ? (
        <div className="col-12 order-last">
          <hr />
          <div className="form-group">
            <select
              name="resourceFieldId"
              onChange={handleKeyFieldChange}
              value={
                recordKeyAttributes ? recordKeyAttributes.resourceFieldId : ""
              }
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
};

const mapStateToProps = ({ fields }) => {
  return { fields };
};

export default connect(mapStateToProps)(RecordKeyField);
