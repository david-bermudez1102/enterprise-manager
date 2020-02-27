import React, { Component } from "react";
import Field from "./Field";
import { connect } from "react-redux";
import { addRecord } from "../../actions/recordActions";

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
        return { field_id: key, content: record[key] };
      })
    };
    this.props.addRecord(record, resource.organizationId, resource.id);
  };

  render() {
    const { fields, resource } = this.props;
    return (
      <div className="col-sm-5">
        <form onSubmit={this.handleSubmit}>
          {fields.map(field => (
            <Field key={field.id} field={field} />
          ))}
          <input
            className="btn btn-primary"
            type="submit"
            value={`Create ${pluralize.singular(resource.name)}`}
          />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addRecord: (record, organizationId, formId) =>
      dispatch(addRecord(record, organizationId, formId))
  };
};

export default connect(null, mapDispatchToProps)(FieldsList);
