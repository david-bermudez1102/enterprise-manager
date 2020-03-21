import React, { Component } from "react";
import cuid from "cuid";
import RecordCell from "./RecordCell";

class Record extends Component {
  handleDoubleClick = e => {};

  render() {
    const { records, record, recordFields, values, resourceId } = this.props;
    return (
      <tr>
        <th>
          {records
            .filter(record => record.formId === resourceId)
            .indexOf(record) + 1}
        </th>
        {recordFields
          .filter(recordField => recordField.formId === resourceId)
          .map(recordField => (
            <RecordCell
              key={cuid()}
              recordField={recordField}
              values={values}
              record={record}
            />
          ))}
      </tr>
    );
  }
}
export default Record;
