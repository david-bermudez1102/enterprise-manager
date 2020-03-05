import React, { Component } from "react";
import Field from "./Field";
import { connect } from "react-redux";
import { addRecord } from "../../actions/recordActions";
import cuid from "cuid";
import { Link } from "react-router-dom";
import { CardHeader, CardBody } from "../Cards/Cards";
import { NoContent } from "../NoContent";

const pluralize = require("pluralize");

class FieldsList extends Component {
  constructor() {
    super();
    this.fields = []; // For the refs
  }

  handleSubmit = event => {
    event.preventDefault();
    const { resource, addRecord } = this.props;
    const record = {
      values_attributes: this.fields
        .filter(n => n)
        .map(field => {
          return { record_field_id: field.name, content: field.value };
        })
    };
    addRecord(record, resource.organizationId, resource.id);
  };

  render() {
    const { match, fields, resource } = this.props;
    const recordFields = this.props.recordFields.filter(
      recordField => recordField.formId === resource.id
    );
    return (
      <>
        <CardHeader>
          <span className="card-title display-4">
            {pluralize(resource.name)}
          </span>
          <span className="card-title">
            <Link to={`${match.url}/fields/new`} title="Add new field">
              <i
                className="fad fa-plus-circle"
                style={{ fontSize: "24px" }}></i>
            </Link>{" "}
            <Link
              to={`${match.url}/records`}
              title={`View all ${resource.name}`}>
              <i className="fad fa-th-list" style={{ fontSize: "24px" }}></i>
            </Link>
          </span>
        </CardHeader>
        <CardBody>
          {fields.filter(field => field.formId === resource.id).length > 0 ? (
            <form onSubmit={this.handleSubmit}>
              {fields.map((field, index) => {
                const recordField = recordFields.find(
                  f => f.fieldId === field.id
                );
                return field.formId === resource.id && recordField ? (
                  <Field
                    key={cuid()}
                    field={field}
                    recordField={recordField}
                    match={match}
                    fieldRef={el => (this.fields[index] = el)}
                  />
                ) : null;
              })}
              <input
                className="btn btn-primary"
                type="submit"
                value={`Create ${pluralize.singular(resource.name)}`}
              />
            </form>
          ) : (
            <NoContent>This form doesn't have any fields yet</NoContent>
          )}
        </CardBody>
      </>
    );
  }
}

const mapStateToProps = ({ fields, recordFields }) => {
  return { fields, recordFields };
};

export default connect(mapStateToProps, { addRecord })(FieldsList);
