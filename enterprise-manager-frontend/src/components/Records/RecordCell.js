import React, { useState } from "react"
import CellForm from "./CellForm"
import { format } from "date-fns"
import { Popover } from "antd"

const RecordCell = props => {
  const {
    organizationId,
    title,
    children,
    dataIndex,
    record,
    session,
    fieldType,
    ...restProps
  } = props

  const { id, formId } = record || {}
  const [editing, setEditing] = useState(false)

  const handleClick = () => {
    setEditing(true)
  }

  const handleBlur = () => {
    setEditing(false)
  }

  const value = dataIndex
  const content = value ? record[value] : null
  const dateFormat = "yyyy/MM/dd"
  const isTypeableField = !["boolean_field", "radio"].includes(fieldType)

  if (!record) return <td {...restProps}>{children}</td>
  if (fieldType === "key_field") return <td {...restProps}>{children}</td>

  let cellForm = (
    <CellForm
      record={record}
      content={content}
      handleBlur={handleBlur}
      recordId={id}
      recordFieldId={dataIndex}
      formId={formId}
      session={session}
      organizationId={organizationId}
      isTypeableField={isTypeableField}
    />
  )

  return !isTypeableField ? (
    <Popover destroyTooltipOnHide trigger={"click"} content={cellForm}>
      <td {...restProps}>{content}</td>
    </Popover>
  ) : (
    <td {...restProps} onClick={handleClick}>
      {editing ? (
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%"
          }}>
          {cellForm}
        </div>
      ) : fieldType === "date_field" ? (
        content && content !== "" ? (
          format(new Date(content), dateFormat)
        ) : (
          content
        )
      ) : (
        content
      )}
    </td>
  )
}

export default RecordCell
