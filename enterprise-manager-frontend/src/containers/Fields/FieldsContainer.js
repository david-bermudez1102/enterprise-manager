import React, { Component } from "react";
import FieldForm from "../../components/Fields/FieldForm/FieldForm";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { addField, updateField, removeField } from "../../actions/fieldActions";
import { addRecordField } from "../../actions/recordFieldActions";
import FieldsList from "../../components/Fields/FieldsList";
import FieldDelete from "../../components/Fields/FieldDelete";
import { FormCard } from "../../components/Cards/Cards";
import { plural } from "pluralize";

class FieldsContainer extends Component {
  render() {
    const {
      match,
      location,
      addField,
      addRecordField,
      updateField,
      organizationId,
      resource,
      removeField,
      fields
    } = this.props;
    const isFieldsPath = location.pathname.includes("fields");
    return (
      <>
        <div
          className={`${isFieldsPath ? "col-lg-4 pr-0" : "col-lg-7"} min-h-100`}
          style={{ maxHeight: "80vh" }}>
          <div className="card border-0 shadow-sm h-100">
            <FieldsList
              match={match}
              resource={resource}
              updateField={updateField}
            />
          </div>
        </div>
        <Switch>
          <Route
            exact
            path={`${match.path}/fields/new`}
            render={props => (
              <div className="col-lg-4">
                <FormCard
                  header={
                    <h2 className="card-title mb-0 text-white">
                      <i className="fad fa-plus-circle mr-2"></i>Add Field to{" "}
                      {plural(resource.name)}
                    </h2>
                  }>
                  <FieldForm
                    addField={addField}
                    addRecordField={addRecordField}
                    organizationId={organizationId}
                    resourceId={resource.id}
                  />
                </FormCard>
              </div>
            )}
          />
          <Route
            exact
            path={`${match.path}/fields/:fieldId/delete`}
            render={props => (
              <FieldDelete
                {...props}
                redirectTo={match.url}
                organizationId={organizationId}
                resourceId={resource.id}
                removeField={removeField}
              />
            )}
          />
          <Route
            exact
            path={`${match.path}/fields/:fieldId/edit`}
            render={props => {
              const field = fields.find(
                field => field.id === parseInt(props.match.params.fieldId)
              );
              if (field)
                return (
                  <div className="col-lg-4">
                    <FormCard
                      header={
                        <span
                          className="card-title display-4 mb-0"
                          style={{ fontSize: "32px" }}>
                          Edit Field "{field.name}"
                        </span>
                      }>
                      <FieldForm
                        updateField={updateField}
                        organizationId={organizationId}
                        resourceId={resource.id}
                        field={field}
                        action="Update Field"
                      />
                    </FormCard>
                  </div>
                );
            }}
          />
        </Switch>
      </>
    );
  }
}

export default connect(null, {
  addField,
  addRecordField,
  updateField,
  removeField
})(FieldsContainer);
