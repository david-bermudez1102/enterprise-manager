import React from "react";
import FieldForm from "../../components/Fields/FieldForm";
import { Route, Switch } from "react-router-dom";
import { updateField, removeField, addField } from "../../actions/fieldActions";
import FieldDelete from "../../components/Fields/FieldDelete";
import { FormCard } from "../../components/Cards/Cards";
import { plural } from "pluralize";
import FieldsList from "../../components/Fields/FieldsList/FieldsList";
import {
  addRecordField,
  updateRecordField
} from "../../actions/recordFieldActions";

const FieldsContainer = props => {
  const { match, location, organizationId, resource, fields } = props;
  const isFieldsPath = location.pathname.includes("fields");

  return (
    <>
      <div
        className={`${isFieldsPath ? "col-lg-4 pr-0" : "col-lg-7"} min-h-100`}
        style={{ maxHeight: "80vh" }}>
        <div className="card border-0 shadow-sm h-100">
          <FieldsList
            fields={fields}
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
                  <h2>
                    <i className="fad fa-plus-circle mr-2"></i>Add Field to{" "}
                    {plural(resource.name)}
                  </h2>
                }>
                <FieldForm
                  {...props}
                  addField={addField}
                  addRecordField={addRecordField}
                  field={{}}
                  action={"Add Field"}
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
                      {...props}
                      updateField={updateField}
                      updateRecordField={updateRecordField}
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
};

export default FieldsContainer;
