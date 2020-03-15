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
          className={`${
            isFieldsPath ? "col-lg-4 order-2" : "col-lg-7"
          } min-h-100`}>
          <div className="card border-0 shadow-sm">
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
              <div className="col-lg-4 order-1 pr-0">
                <FormCard
                  header={
                    <span
                      className="card-title display-4 mb-0"
                      style={{ fontSize: "32px" }}>
                      Add Field to {plural(resource.name)}
                    </span>
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
                  <div className="col-lg-4 order-1 pr-0">
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
