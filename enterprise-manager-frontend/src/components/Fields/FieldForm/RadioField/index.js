import React from "react"
import { mdiCheckboxMultipleMarkedCircleOutline } from "@mdi/js"
import SelectableOptions from "../SelectableField/SelectableOptions"
import { useHandleChange } from "../../Hooks/useHandleChange"
import { Col } from "antd"
import RadioWrapper from "../RadioWrapper"

const RadioField = props => {
  const { field, fieldType, onChange } = props
  const { handleChange, handleSelectable } = useHandleChange({
    field,
    onChange
  })

  return (
    <>
      <RadioWrapper
        name='fieldType'
        id='radio_field'
        value='radio'
        onChange={handleChange}
        iconPath={mdiCheckboxMultipleMarkedCircleOutline}
        iconTitle={"Radio Field"}
        fieldType={fieldType}>
        Radio Field
      </RadioWrapper>
      {fieldType === "radio" ? (
        <Col span={24} order={24}>
          <SelectableOptions
            field={field}
            fieldType={fieldType}
            handleSelectable={handleSelectable}
            handleChange={handleChange}
          />
        </Col>
      ) : null}
    </>
  )
}

export default RadioField
