import React from "react"
import { Select } from "antd"
import FieldTypeWrapper from "../FieldTypeWrapper"
import { useSelector, shallowEqual } from "react-redux"

const AccountsField = props => {
  const {
    field,
    name,
    editingMode,
    onChange,
    suffix,
    form,
    ...newProps
  } = props
  const { accounts } = useSelector(
    ({ accounts }) => ({ accounts }),
    shallowEqual
  )

  const handleChange = (value, option) => {
    form.setFieldsValue({ [name]: value })
    onChange({
      recordFieldId: props.name,
      content: option.value,
      accountId: option.id
    })
  }

  return (
    <FieldTypeWrapper
      name={name}
      editingMode={editingMode}
      field={field}
      suffix={suffix}>
      <Select
        {...newProps}
        options={accounts.map(account => ({
          id: account.id,
          label: account.name,
          value: account.name
        }))}
        onChange={handleChange}
        placeholder={"Select"}
      />
    </FieldTypeWrapper>
  )
}

export default AccountsField
