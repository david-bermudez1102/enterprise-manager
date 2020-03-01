import React, { Component } from "react";
import Record from "./Record";
import cuid from "cuid";

class RecordsList extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    const RecordsList = this.myRef.current.getBoundingClientRect();
    window.scrollTo(RecordsList.x, RecordsList.y);
  }

  render() {
    const { records, recordFields, resource, values } = this.props;
    return (
      <table ref={this.myRef} className="table table-striped table-sm">
        <thead>
          <tr>
            {recordFields.map(field =>
              field.formId === resource.id ? (
                <th key={cuid()}>{field.name}</th>
              ) : null
            )}
          </tr>
        </thead>
        <tbody>
          {records.map(record =>
            record.formId === resource.id ? (
              <Record
                key={cuid()}
                record={record}
                recordFields={recordFields}
                resourceId={resource.id}
                values={values}
              />
            ) : null
          )}
        </tbody>
      </table>
    );
  }
}
export default RecordsList;
