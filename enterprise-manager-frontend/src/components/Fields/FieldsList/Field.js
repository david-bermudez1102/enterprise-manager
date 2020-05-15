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
import { Popover } from "antd";
import { SettingOutlined } from "@ant-design/icons";

const Field = props => {
  const { match, field, recordField } = props;

  const fieldName = field.name
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
    .join(" ");

  let inputField;
  const inputAttributes = {
    name: recordField.id,
    id: field.fieldAlias + "_field_list",
    placeholder: `Enter ${fieldName}`,
    onChange: props.handleChange,
    suffix: (
      <Popover
        content={
          <Options
            url={`${match.url}/fields`}
            content={field}
            deletionMessage="The field will be deleted from the resource."
          />
        }>
        <SettingOutlined style={{ color: "rgba(0,0,0,.45)" }} />
      </Popover>
    ),
    field,
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
  return inputField;
};

export default Field;
