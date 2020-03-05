import React, { Component } from "react";
import FieldForm from "../../components/Fields/FieldForm/FieldForm";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { addField, updateField, removeField } from "../../actions/fieldActions";
import { addRecordField } from "../../actions/recordFieldActions";
import FieldsList from "../../components/Fields/FieldsList";
import FieldDelete from "../../components/Fields/FieldDelete";

class FieldsContainer extends Component {
  render() {
    const {
      match,
      addField,
      addRecordField,
      updateField,
      organizationId,
      resource,
      removeField,
      fields
    } = this.props;

    return (
      <div className="col-lg-8">
        <div className="card border-0 shadow-sm">
          <FieldsList
            match={match}
            resource={resource}
            updateField={updateField}
          />
          <div className="card-footer">
            <Switch>
              <Route
                exact
                path={`${match.path}/fields/new`}
                render={props => (
                  <FieldForm
                    addField={addField}
                    addRecordField={addRecordField}
                    organizationId={organizationId}
                    resourceId={resource.id}
                  />
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
                      <FieldForm
                        updateField={updateField}
                        organizationId={organizationId}
                        resourceId={resource.id}
                        field={field}
                        action="Update Field"
                      />
                    );
                }}
              />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, {
  addField,
  addRecordField,
  updateField,
  removeField
})(FieldsContainer);
