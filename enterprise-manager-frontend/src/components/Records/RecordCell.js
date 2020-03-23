import React, { Component } from "react";
import { connect } from "react-redux";
import { addValue, updateValue } from "../../actions/valueActions";
import CellForm from "./CellForm";

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
      values,
      recordField,
      record,
      addValue,
      updateValue,
      session
    } = this.props;
    const { editing } = this.state;
    const value = values.filter(
      value =>
        value.recordFieldId === recordField.id && value.recordId === record.id
    );
    const content = value.map(value => value.content)[0];
    return (
      <td onClick={this.handleClick} className="text-nowrap">
        {editing ? (
          <div className="position-relative w-100">
            {value[0] ? (
              <CellForm
                value={value[0]}
                handleBlur={this.handleBlur}
                updateValue={updateValue}
                session={session}
              />
            ) : (
              <CellForm
                formId={record.formId}
                recordFieldId={recordField.id}
                recordId={record.id}
                handleBlur={this.handleBlur}
                addValue={addValue}
                session={session}
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
export default connect(mapStateToProps, { addValue, updateValue })(RecordCell);
