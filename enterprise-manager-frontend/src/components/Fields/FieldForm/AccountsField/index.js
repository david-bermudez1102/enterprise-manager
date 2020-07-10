import React from "react"
import { mdiAccountGroup } from "@mdi/js"
import { useHandleChange } from "../../Hooks/useHandleChange"
import RadioWrapper from "../RadioWrapper"

const AccountsField = props => {
  const { field, fieldType, onChange } = props

  const { handleChange } = useHandleChange({
    field,
    onChange
  })

  return (
    <RadioWrapper
      name='fieldType'
      id='accounts_field'
      value='accounts_field'
      onChange={handleChange}
      iconPath={mdiAccountGroup}
      iconTitle={"Accounts Field"}
      fieldType={fieldType}>
      Accounts Field
    </RadioWrapper>
  )
}

export default AccountsField
