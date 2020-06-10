import React from "react"
import SelectableChoice from "./SelectableChoice"
import { mdiSelectPlace } from "@mdi/js"
import { useHandleChange } from "../../Hooks/useHandleChange"
import { Col } from "antd"
import RadioWrapper from "../RadioWrapper"

const SelectableField = props => {
  const { field, fieldType, resourceId, onChange } = props
  const { handleChange, handleSelectable } = useHandleChange({
    field,
    onChange
  })

  return (
    <>
      <RadioWrapper
        name='fieldType'
        id='selectable_field'
        value='selectable'
        onChange={handleChange}
        iconPath={mdiSelectPlace}
        iconTitle={"Selectable Field"}
        fieldType={fieldType}>
        Selectable Field
      </RadioWrapper>
      {fieldType === "selectable" ? (
        <Col span={24} order={24}>
          <SelectableChoice
            resourceId={resourceId}
            field={field}
            fieldType={fieldType}
            handleChange={handleChange}
            handleSelectable={handleSelectable}
          />
        </Col>
      ) : null}
    </>
  )
}
export default SelectableField
