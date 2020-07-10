import React from "react"
import Options from "../../Options/Options"
import TextAreaField from "./TextareaField"
import NumericField from "./NumericField"
import DateField from "./DateField"
import SelectableField from "./SelectableField"
import RadioField from "./RadioField"
import CheckboxField from "./CheckboxField"
import CombinedField from "./CombinedField"
import TextField from "./TextField"
import KeyField from "./KeyField"
import { Popover, Button } from "antd"
import { SettingOutlined } from "@ant-design/icons"
import AccountsField from "./AccountsField"
import BooleanField from "./BooleanField"

const Field = props => {
  const { editingMode, match, field, recordField, userPermission } = props

  const fieldName = field.name
    .split("_")
    .map(word => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
    .join(" ")

  let inputField
  const inputAttributes = {
    name: recordField.id,
    id: field.fieldAlias + "_field_list",
    placeholder: `Enter ${fieldName}`,
    onChange: props.handleChange,
    editingMode: editingMode,
    onBlur: props.onBlur,
    autoFocus: props.autoFocus,
    style: props.style,
    suffix:
      props.suffix ||
      ((userPermission.canDelete || userPermission.canUpdate) && (
        <Popover
          color={"lime"}
          placement={"top"}
          content={
            <Options
              permission={userPermission}
              url={`${match.url}/new/fields`}
              content={field}
              deletionMessage='The field will be deleted from the resource.'
            />
          }>
          <Button
            type={"link"}
            style={{ padding: 0, margin: 0, color: "inherit" }}>
            <SettingOutlined />
          </Button>
        </Popover>
      )),
    field: {
      ...field,
      style: {
        display:
          field.hiddenInForm && !userPermission.canUpdate ? "none" : undefined
      }
    }
  }
  switch (field.fieldType) {
    case "selectable":
      inputField = (
        <SelectableField
          {...inputAttributes}
          fieldName={fieldName}
          form={props.form}
        />
      )
      break
    case "textarea":
      inputField = (
        <TextAreaField
          {...inputAttributes}
          onPressEnter={e => {
            if (!e.shiftKey) {
              if (e.key === "Enter") props.onPressEnter(e)
            }
          }}
        />
      )
      break
    case "numeric_field":
      inputField = <NumericField {...inputAttributes} />
      break
    case "date_field":
      inputField = <DateField {...inputAttributes} />
      break
    case "key_field":
      inputField = (
        <KeyField
          {...inputAttributes}
          state={props.state}
          fields={props.fields}
          form={props.form}
        />
      )
      break
    case "radio":
      inputField = <RadioField {...inputAttributes} />
      break
    case "checkbox":
      inputField = <CheckboxField {...inputAttributes} />
      break
    case "combined_field":
      inputField = <CombinedField {...inputAttributes} state={props.state} />
      break
    case "accounts_field":
      inputField = (
        <AccountsField
          {...inputAttributes}
          state={props.state}
          form={props.form}
        />
      )
      break
    case "boolean_field":
      inputField = <BooleanField {...inputAttributes} state={props.state} />
      break
    default:
      inputField = <TextField {...inputAttributes} />
      break
  }
  return inputField
}

export default Field
