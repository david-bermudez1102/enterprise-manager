import React from "react";
import Record from "./Record";
import cuid from "cuid";

const RecordsList = ({ records, fields, values }) => {
  return (
    <table className="table table-striped table-sm">
      <thead>
        <tr>
          {fields.map(field => (
            <th key={cuid()}>{field.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {records.map(record => (
          <Record
            key={cuid()}
            record={record}
            fields={fields}
            values={values}
          />
        ))}
      </tbody>
    </table>
  );
};
export default RecordsList;
