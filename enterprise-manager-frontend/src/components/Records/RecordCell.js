import React, { useState } from "react"
import CellForm from "./CellForm"
import { format } from "date-fns"

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

  if (!record) return <td {...restProps}>{children}</td>
  if (fieldType === "key_field") return <td {...restProps}>{children}</td>

  return (
    <td {...restProps} onClick={handleClick}>
      {editing ? (
        <div style={{ position: "relative" }}>
          <CellForm
            record={record}
            content={content}
            handleBlur={handleBlur}
            recordId={record.id}
            recordFieldId={dataIndex}
            formId={record.formId}
            session={session}
            organizationId={organizationId}
          />
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
