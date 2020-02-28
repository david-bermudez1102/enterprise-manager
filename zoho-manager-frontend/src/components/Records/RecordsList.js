import React from "react";
import Record from "./Record";
import cuid from "cuid";

const RecordsList = ({ records, recordFields, resource, values }) => {
  return (
    <table className="table table-striped table-sm">
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
        {records.map(record => record.formId === resource.id ? (
          <Record
            key={cuid()}
            record={record}
            recordFields={recordFields}
            values={values}
          />
        ) : null)}
      </tbody>
    </table>
  );
};
export default RecordsList;
