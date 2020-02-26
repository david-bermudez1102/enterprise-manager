import React from "react";
import { Link } from "react-router-dom";

const RecordsList = ({ records, fields, values }) => {
  return (
    <table border="1">
      <tr>
        {fields.map(field => (
          <th>{field.name}</th>
        ))}
      </tr>
      {records.map(record => (
        <tr>{values.filter(value => value.recordId === record.id).map(value => <td>{value.content}</td>)}</tr>
      ))}
    </table>
  );
};
export default RecordsList;
