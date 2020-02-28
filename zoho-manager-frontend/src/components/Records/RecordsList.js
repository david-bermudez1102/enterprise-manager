import React from "react";
import Record from "./Record";
import cuid from "cuid";

const RecordsList = ({ records, fields, resource, values }) => {
  return (
    <table className="table table-striped table-sm">
      <thead>
        <tr>
          {fields.map(field =>
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
            fields={fields}
            values={values}
          />
        ) : null)}
      </tbody>
    </table>
  );
};
export default RecordsList;
