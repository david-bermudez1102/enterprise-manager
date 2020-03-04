import React, { Component } from "react";
import cuid from "cuid";
import Options from "../Options/Options";
import { Switch, Route } from "react-router-dom";

export default class RecordsHeader extends Component {
  render() {
    const { match, recordFields, resource } = this.props;
    return (
      <thead>
        <tr>
          {recordFields.map(field => {
            return field.formId === resource.id ? (
              <th key={cuid()}>
                <Options
                  url={`${match.url}/record_fields`}
                  content={field}
                  fontSize="14px"
                />
              </th>
            ) : null;
          })}
        </tr>
      </thead>
    );
  }
}
