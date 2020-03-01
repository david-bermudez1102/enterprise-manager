import React, { Component } from "react";
import FieldForm from "../../components/Fields/FieldForm/FieldForm";
import { Link, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { addField, updateField, removeField } from "../../actions/fieldActions";
import FieldsList from "../../components/Fields/FieldsList";
import cuid from "cuid";
import FieldDelete from "../../components/Fields/FieldDelete";

class FieldsContainer extends Component {
  render() {
    const {
      match,
      addField,
      updateField,
      organizationId,
      resource,
      removeField,
      fields
    } = this.props;
    return (
      <div className="col-lg-8">
        <h3>{resource.name}</h3>
        <FieldsList
          key={cuid()}
          match={match}
          resource={resource}
          updateField={updateField}
        />
        <Link to={`${match.url}/fields/new`}>Add new field</Link>

        <Switch>
          <Route
            exact
            path={`${match.path}/fields/new`}
            render={props => (
              <FieldForm
                addField={addField}
                organizationId={organizationId}
                resourceId={resource.id}
              />
            )}
          />
          <Route
            exact
            path={`${match.url}/fields/:fieldId/delete`}
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
            path={`${match.url}/fields/:fieldId/edit`}
            render={props => {
              if (fields.length > 0) {
                const field = fields.find(
                  field => field.id === parseInt(props.match.params.fieldId)
                );
                return (
                  <FieldForm
                    updateField={updateField}
                    organizationId={organizationId}
                    resourceId={resource.id}
                    field={field}
                    action="Update Field"
                  />
                );
              }
            }}
          />
        </Switch>
      </div>
    );
  }
}

export default connect(null, {
  addField,
  updateField,
  removeField
})(FieldsContainer);
