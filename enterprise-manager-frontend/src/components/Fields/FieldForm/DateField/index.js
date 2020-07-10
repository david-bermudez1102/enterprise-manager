import React from "react"
import { mdiCalendarRange } from "@mdi/js"
import { useHandleChange } from "../../Hooks/useHandleChange"
import RadioWrapper from "../RadioWrapper"
import { Col } from "antd"

const DateField = ({ field, fieldType, onChange }) => {
  const { handleChange } = useHandleChange({ field, onChange })
  return (
    <>
      <RadioWrapper
        name='fieldType'
        id='date_field'
        value='date_field'
        onChange={handleChange}
        iconPath={mdiCalendarRange}
        iconTitle={"Date Field"}
        fieldType={fieldType}>
        Date Field
      </RadioWrapper>
      {fieldType === "date_field" && (
        <Col span={24} order={24}>
          <small>
            If you want the current date saved everytime a new record is
            created, turn the "show timestamps" option in resource settings
            instead.
          </small>
        </Col>
      )}
    </>
  )
}
export default DateField
