import React, { Component } from "react";
import Record from "./Record";
import cuid from "cuid";
import RecordsHeader from "./RecordsHeader";

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
      <table ref={this.myRef} className="table table-striped table-sm w-100">
        <RecordsHeader {...this.props} />
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
