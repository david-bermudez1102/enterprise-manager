import React, { Component } from "react";
import Field from "./Field";
import { connect } from "react-redux";
import { addRecord } from "../../actions/recordActions";
import cuid from "cuid";

const pluralize = require("pluralize");

class FieldsList extends Component {
  handleSubmit = event => {
    event.persist();
    event.preventDefault();
    const { resource } = this.props;
    const formData = new FormData(event.target);

    let record = {};
    for (const [key, value] of formData.entries()) {
      record[key] = value;
    }
    record = {
      values_attributes: Object.keys(record).map(key => {
        return { record_field_id: key, content: record[key] };
      })
    };
    this.props.addRecord(record, resource.organizationId, resource.id);
  };

  render() {
    const { match, fields, resource } = this.props;
    const recordFields = this.props.recordFields.filter(recordField => recordField.formId === resource.id)
    return (
      <form onSubmit={this.handleSubmit}>
        {fields.map(field =>
            field.formId === resource.id ? (
              <Field
                key={cuid()}
                field={field}
                recordField={recordFields.find(f => f.fieldId === field.id)}
                match={match}
              />
            ) : null
          )}
        <input
          className="btn btn-primary"
          type="submit"
          value={`Create ${pluralize.singular(resource.name)}`}
        />
      </form>
    );
  }
}

const mapStateToProps = ({ fields, recordFields }) => {
  return { fields, recordFields };
};

export default connect(mapStateToProps, { addRecord })(FieldsList);
