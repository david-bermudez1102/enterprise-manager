import React from "react"

const RecordRow = props => {
  const { children, ...newProps } = props
  return <tr {...newProps}>{children}</tr>
}
export default RecordRow
