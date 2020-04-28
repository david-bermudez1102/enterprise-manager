import React from "react";
import Options from "../../Options/Options";
import TextAreaField from "./TextareaField";
import NumericField from "./NumericField";
import DateField from "./DateField";
import SelectableField from "./SelectableField";
import RadioField from "./RadioField";
import CheckboxField from "./CheckboxField";
import CombinedField from "./CombinedField";
import TextField from "./TextField";
import KeyField from "./KeyField";

const { formControl } = {
  formControl: "form-control rounded-pill"
};

const Field = props => {
  const { match, field, recordField } = props;

  const fieldName = field.name
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
    .join(" ");

  let inputField;
  const inputAttributes = {
    className: formControl,
    name: recordField.id,
    id: field.fieldAlias,
    type: field.fieldType,
    placeholder: `Enter ${fieldName}`,
    onChange: props.handleChange,
    required: true,
    field
  };
  switch (field.fieldType) {
    case "selectable":
      inputField = (
        <SelectableField {...inputAttributes} fieldName={fieldName} />
      );
      break;
    case "textarea":
      inputField = <TextAreaField {...inputAttributes} />;
      break;
    case "numeric_field":
      inputField = <NumericField {...inputAttributes} />;
      break;
    case "date_field":
      inputField = <DateField {...inputAttributes} />;
      break;
    case "key_field":
      inputField = (
        <KeyField
          {...inputAttributes}
          state={props.state}
          fields={props.fields}
        />
      );
      break;
    case "radio":
      inputField = <RadioField {...inputAttributes} />;
      break;
    case "checkbox":
      inputField = <CheckboxField {...inputAttributes} />;
      break;
    case "combined_field":
      inputField = <CombinedField {...inputAttributes} state={props.state} />;
      break;
    default:
      inputField = <TextField {...inputAttributes} />;
      break;
  }
  const isLabelable =
    field.fieldType === "checkbox" || field.fieldType === "radio";
  // Used to check if label should be inside field.
  return (
    <>
      <Options
        url={`${match.url}/fields`}
        content={field}
        deletionMessage="The field will be deleted from the resource."
        style={{ marginTop: "-15px" }}
      />
      <div className={isLabelable ? "form-group mb-0" : "form-group"}>
        {inputField}
        {field.fieldType !== "selectable" ? (
          <label
            htmlFor={field.fieldAlias}
            className={isLabelable ? "ml-1" : "form-control-placeholder"}
            style={
              isLabelable
                ? {
                    fontSize: "16px",
                    marginTop: "-55px",
                    position: "absolute"
                  }
                : undefined
            }>
            {fieldName}
          </label>
        ) : null}
      </div>
    </>
  );
};

export default Field;
