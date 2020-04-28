import React, { useState, useEffect, useRef } from "react";

import { useDispatch } from "react-redux";
import RecordKeyField from "./RecordKeyField";
import TextField from "./TextField";
import NumericField from "./NumericField";
import TextareaField from "./TextareaField";
import PasswordField from "./PasswordField";
import SelectableField from "./SelectableField";
import RadioField from "./RadioField";
import CheckBoxField from "./CheckBoxField";
import DateField from "./DateField";
import CombinedField from "./CombinedField";

const FieldForm = props => {
  const { organizationId, action, resourceId } = props;
  const { key, fieldAlias, name, formId, isRequired, ...field } = props.field;
  const [fieldState, setFieldState] = useState(field || {});
  const mounted = useRef();

  const dispatch = useDispatch();
  const initalState = {
    name: name || "",
    formId: formId || resourceId,
    isRequired: isRequired || false
  };

  const [state, setState] = useState(initalState);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      setFieldState(field || {});
      setState(initalState);
    }
    // eslint-disable-next-line
  }, [props.match]);

  const onChange = state => {
    setFieldState(state);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { addField, updateField, addRecordField, updateRecordField } = props;
    if (addField) {
      dispatch(addField({ ...state, ...fieldState }, organizationId)).then(
        field => {
          setState(initalState);
          setFieldState({});
          return field ? dispatch(addRecordField(field, organizationId)) : null;
        }
      );
    }
    if (updateField)
      dispatch(
        updateField({ ...state, ...fieldState }, organizationId, field.id)
      ).then(field =>
        field
          ? dispatch(
              updateRecordField(field, organizationId, field.recordFieldId)
            )
          : null
      );
  };

  const fieldProps = {
    field,
    fieldType: fieldState.fieldType || "",
    onChange
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          className="form-control rounded-pill"
          type="text"
          name="name"
          id="field_name"
          onChange={e =>
            setState({
              ...state,
              name: e.target.value
            })
          }
          value={state.name}
          placeholder="Enter field name..."
          required
        />
        <label className="form-control-placeholder" htmlFor="field_name">
          Field Name
        </label>
      </div>
      <hr />
      <div className="form-group row">
        <label htmlFor="fieldType" className="col-12 order-first">
          Field Type:
        </label>
        <RecordKeyField resourceId={resourceId} {...fieldProps} />
        <TextField {...fieldProps} />
        <NumericField {...fieldProps} />
        <TextareaField {...fieldProps} />
        <PasswordField {...fieldProps} />
        <SelectableField {...fieldProps} />
        <RadioField {...fieldProps} />
        <CheckBoxField {...fieldProps} />
        <DateField {...fieldProps} />
        <CombinedField {...fieldProps} resourceId={resourceId} />
      </div>
      <hr />
      <div className="form-check form-check-inline">
        <input
          type="checkbox"
          name="isRequired"
          className="form-check-input"
          onChange={e =>
            setState({ ...state, isRequired: e.target.checked ? true : false })
          }
          checked={state.isRequired}
        />
        <label className="form-check-label" htmlFor="isRequired">
          Required
        </label>
      </div>
      <hr />
      <input type="submit" value={action} className="btn btn-primary shadow" />
    </form>
  );
};
export default FieldForm;
