import React, { Component } from "react"
import { connect } from "react-redux"
import CellForm from "./CellForm"
import { updateRecord } from "../../actions/recordActions"
import { format } from "date-fns"

class RecordCell extends Component {
  state = { editing: false }

  handleClick = () => {
    this.setState({ editing: true })
  }

  handleBlur = () => {
    this.setState({ editing: false })
  }

  render() {
    const {
      organizationId,
      title,
      children,
      dataIndex,
      record,
      updateRecord,
      session,
      fieldType,
      ...restProps
    } = this.props
    const { editing } = this.state
    const value = dataIndex
    const content = value ? record[value] : null
    const dateFormat = "yyyy/MM/dd"

    if (!record) return <td {...restProps}>{children}</td>
    if (fieldType === "key_field") return <td {...restProps}>{children}</td>

    return (
      <td {...restProps} onClick={this.handleClick}>
        {editing ? (
          <div style={{ position: "relative" }}>
            <CellForm
              record={record}
              content={content}
              handleBlur={this.handleBlur}
              updateRecord={updateRecord}
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
}

const mapStateToProps = ({ session }) => {
  return { session }
}
export default connect(mapStateToProps, { updateRecord })(RecordCell)
