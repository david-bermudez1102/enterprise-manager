import React, { Component } from "react";
import { connect } from "react-redux";
import { updateValue } from "../../actions/valueActions";
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
    const { values, recordField, record, updateValue, session } = this.props;
    const { editing } = this.state;
    const value = values.find(
      value =>
        value.recordFieldId === recordField.id && value.recordId === record.id
    );
    return (
      <td onClick={this.handleClick}>
        {editing ? (
          <div className="position-relative w-100">
            <CellForm
              value={value}
              handleBlur={this.handleBlur}
              updateValue={updateValue}
              session={session}
            />
          </div>
        ) : (
          value.content
        )}
      </td>
    );
  }
}

const mapStateToProps = ({ session }) => {
  return { session };
};
export default connect(mapStateToProps, { updateValue })(RecordCell);
