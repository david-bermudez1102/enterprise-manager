import React from "react"
import { mdiNumeric } from "@mdi/js"
import NumericFieldOptions from "./NumericFieldOptions"
import { useHandleChange } from "../../Hooks/useHandleChange"
import RadioWrapper from "../RadioWrapper"

const NumericField = ({ field, fieldType, resourceId, onChange }) => {
  const { handleChange, handleNumericField } = useHandleChange({
    field,
    onChange
  })

  return (
    <>
      <RadioWrapper
        id='numeric_field'
        name={"fieldType"}
        value={"numeric_field"}
        onChange={handleChange}
        iconPath={mdiNumeric}
        iconTitle={"Numeric Field"}
        fieldType={fieldType}>
        Numeric Field
      </RadioWrapper>
      <NumericFieldOptions
        resourceId={resourceId}
        fieldType={fieldType}
        handleChange={handleNumericField}
        field={field}
      />
    </>
  )
}
export default NumericField
