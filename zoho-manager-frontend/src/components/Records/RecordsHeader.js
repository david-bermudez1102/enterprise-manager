import React, { Component } from "react";
import cuid from "cuid";
import Options from "../Options/Options";

export default class RecordsHeader extends Component {
  state = { order: "asc" };

  handleSortBy = fieldId => {
    this.setState({ order: this.state.order === "asc" ? "desc" : "asc" }, () =>
      this.props.handleSortBy(fieldId)
    );
  };
  render() {
    const { match, recordFields, resource } = this.props;
    return (
      <thead>
        <tr>
          {recordFields.map(field => {
            return field.formId === resource.id ? (
              <th key={cuid()}>
                <span className="d-flex w-100 align-items-center">
                  <button
                    className="btn btn-transparent px-0 pr-1 shadow-none"
                    onClick={() => this.handleSortBy(field.id)}>
                    <i className="fas fa-sort"></i>
                  </button>
                  <Options
                    url={`${match.url}/record_fields`}
                    content={field}
                    fontSize="14px"
                    deletionMessage="The entire column and all of it's data associated will be deleted."
                  />
                </span>
              </th>
            ) : null;
          })}
        </tr>
      </thead>
    );
  }
}
