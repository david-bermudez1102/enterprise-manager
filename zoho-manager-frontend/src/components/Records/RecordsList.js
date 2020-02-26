import React from "react";
import Record from "./Record";

const RecordsList = ({ records, fields, values }) => {
  return (
    <table border="1">
      <thead>
        <tr>
          {fields.map(field => (
            <th key={`field_${field.id}`}>{field.name}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {records.map(record => (
          <Record key={`record_${record.id}`} record={record} fields={fields} values={values}/>
        ))}
      </tbody>
    </table>
  );
};
export default RecordsList;
