import React from "react";
import { Switch } from "react-router-dom";
import { updateField, removeField } from "../../actions/fieldActions";
import FieldDelete from "../../components/Fields/FieldDelete";
import FieldsList from "../../components/Fields/FieldsList/FieldsList";
import Route from "../../Router/Route";
import { Col } from "antd";
import FieldFormLayout from "../../components/Fields/FieldFormLayout";

const FieldsContainer = props => {
  const { match, organizationId, resource, fields } = props;

  return (
    <>
      <Col span={24}>
        <FieldsList
          fields={fields}
          match={match}
          resource={resource}
          updateField={updateField}
        />
      </Col>
      <Switch>
        <Route exact path={`${match.path}/fields/new`}>
          <FieldFormLayout
            resource={resource}
            organizationId={organizationId}
          />
        </Route>
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
        <Route exact path={`${match.path}/fields/:fieldId/edit`}>
          <FieldFormLayout
            resource={resource}
            organizationId={organizationId}
          />
        </Route>
      </Switch>
    </>
  );
};

export default FieldsContainer;
