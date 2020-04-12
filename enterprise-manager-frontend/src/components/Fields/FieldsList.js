import React, { Component } from "react";
import Field from "./Field";
import { connect } from "react-redux";
import { addRecord } from "../../actions/recordActions";
import cuid from "cuid";
import { Link } from "react-router-dom";
import { CardHeader, CardBody } from "../Cards/Cards";
import { NoContent } from "../NoContent";
import zohoBooksIcon from "../../containers/ZohoBooks/favicon.ico";

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
          const radio = field.querySelector("input[type='radio']");
          const checkbox = field.querySelector("input[type='checkbox']");
          const checkboxFieldsList = field.querySelectorAll("input[type='checkbox'][checked]");
          let option;
          if (field.options) option = field.options[field.selectedIndex];
          else if (radio) option = radio;
          else if (checkbox) option = checkbox;
          const optionDataSet = option ? option.dataset : null;

          let content;
          if (field.querySelector("input[type='radio'][checked]"))
            content = field.querySelector("input[type='radio'][checked]").value;
          else if (checkbox)
            content = Array.from(checkboxFieldsList)
              .map(cb => cb.value)
              .join(", ");
          else content = field.value;

          return {
            record_field_id: radio || checkbox ? option.name : field.name,
            content: content,
            record_value_id: optionDataSet && !checkbox ? optionDataSet.recordValueId : null,
            option_value_id: optionDataSet && !checkbox ? optionDataSet.optionValueId : null,
            checkbox_options_attributes: checkbox
              ? Array.from(checkboxFieldsList).map(cb => {
                  return { option_id: cb.dataset.optionValueId };
                })
              : null
          };
        })
    };
    addRecord(record, resource.organizationId, resource.id);
  };

  render() {
    const { match, fields, resource } = this.props;
    const recordFields = this.props.recordFields.filter(recordField => recordField.formId === resource.id);
    return (
      <>
        <CardHeader>
          <span className="card-title display-4 mb-0 text-primary" style={{ fontSize: "32px" }}>
            <i className="fas fa-folder-plus mr-2"></i>
            Add {pluralize.singular(resource.name)}
          </span>
          <span className="card-title">
            <Link to={`${match.url}/fields/new`} title="Add new field">
              <i className="fad fa-plus-circle" style={{ fontSize: "24px" }}></i>
            </Link>{" "}
            <Link to={`${match.url}/records`} title={`View all ${resource.name}`}>
              <i className="fad fa-th-list" style={{ fontSize: "24px" }}></i>
            </Link>
            <Link to={`${match.url}/connections/zoho/edit`} title="Connect to Zoho Books">
              <button className="btn btn-transparent p-0 mt-n1 d-block-inline">
                <img src={zohoBooksIcon} className="mt-n2" style={{ width: "24px" }} alt="Connect with ZohoBooks" />
              </button>
            </Link>
          </span>
        </CardHeader>
        <CardBody className="scroller">
          {fields.filter(field => field.formId === resource.id).length > 0 ? (
            <form onSubmit={this.handleSubmit} className="position-relative">
              {fields.map((field, index) => {
                const recordField = recordFields.find(f => f.fieldId === field.id);
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
              <hr />
              <input
                className="btn btn-primary shadow"
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
