import React, { Component } from "react";
import { connect } from "react-redux";
import { addValue } from "../../actions/valueActions";
import CellForm from "./CellForm";
import { updateRecord } from "../../actions/recordActions";

class RecordCell extends Component {
  state = { editing: false };

  handleClick = () => {
    this.setState({ editing: true });
  };

  handleBlur = () => {
    this.setState({ editing: false });
  };

  render() {
    const {
      organizationId,
      title,
      children,
      dataIndex,
      record,
      addValue,
      updateRecord,
      session,
      ...restProps
    } = this.props;
    const { editing } = this.state;
    const value = dataIndex;
    const content = value ? record[value] : null;
    if (!record) return <td {...restProps}>{children}</td>;
    return (
      <td {...restProps} onClick={this.handleClick}>
        {editing ? (
          <div style={{ position: "relative" }}>
            {content ? (
              <CellForm
                content={content}
                handleBlur={this.handleBlur}
                updateRecord={updateRecord}
                recordId={record.id}
                recordFieldId={dataIndex}
                formId={record.formId}
                session={session}
                organizationId={organizationId}
              />
            ) : (
              <CellForm
                formId={record.formId}
                recordFieldId={dataIndex}
                recordId={record.id}
                handleBlur={this.handleBlur}
                organizationId={organizationId}
                addValue={addValue}
                session={session}
                formId={record.formId}
              />
            )}
          </div>
        ) : (
          content
        )}
      </td>
    );
  }
}

const mapStateToProps = ({ session }) => {
  return { session };
};
export default connect(mapStateToProps, { addValue, updateRecord })(RecordCell);
