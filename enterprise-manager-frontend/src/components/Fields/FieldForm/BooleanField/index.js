import React from "react"
import { mdiToggleSwitch } from "@mdi/js"
import { useHandleChange } from "../../Hooks/useHandleChange"
import RadioWrapper from "../RadioWrapper"

const BooleanField = props => {
  const { field, fieldType, onChange } = props

  const { handleChange } = useHandleChange({
    field,
    onChange
  })

  return (
    <RadioWrapper
      name='fieldType'
      id='boolean_field'
      value='boolean_field'
      onChange={handleChange}
      iconPath={mdiToggleSwitch}
      iconTitle={"Boolean Field"}
      fieldType={fieldType}>
      Boolean Field
    </RadioWrapper>
  )
}

export default BooleanField
