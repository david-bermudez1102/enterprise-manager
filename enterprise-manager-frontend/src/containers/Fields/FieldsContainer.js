import React from "react";
import FieldForm from "../../components/Fields/FieldForm";
import { Switch } from "react-router-dom";
import { updateField, removeField, addField } from "../../actions/fieldActions";
import FieldDelete from "../../components/Fields/FieldDelete";
import { FormCard } from "../../components/Cards/Cards";
import { plural } from "pluralize";
import FieldsList from "../../components/Fields/FieldsList/FieldsList";
import {
  addRecordField,
  updateRecordField,
} from "../../actions/recordFieldActions";
import Route from "../../Router/Route";
import { Col, Card } from "antd";
import Title from "antd/lib/typography/Title";

const FieldsContainer = props => {
  const { match, location, organizationId, resource, fields } = props;
  const isFieldsPath = location.pathname.includes("fields");

  return (
    <>
      <Col lg={!isFieldsPath ? 12 : 8} sm={24}>
        <Card>
          <FieldsList
            fields={fields}
            match={match}
            resource={resource}
            updateField={updateField}
          />
        </Card>
      </Col>
      <Switch>
        <Route
          exact
          path={`${match.path}/fields/new`}
          render={props => (
            <Col lg={8} sm={24}>
              <Card>
                <Card.Meta
                  title={
                    <Title level={2}>
                      Add Field to {plural(resource.name)}
                    </Title>
                  }
                />
                <FieldForm
                  {...props}
                  addField={addField}
                  addRecordField={addRecordField}
                  field={{}}
                  action={"Add Field"}
                  organizationId={organizationId}
                  resourceId={resource.id}
                />
              </Card>
            </Col>
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
                <Col sm={24} lg={8}>
                  <Card>
                    <Card.Meta
                      title={<Title level={2}>Edit Field "{field.name}"</Title>}
                    />
                    <FieldForm
                      {...props}
                      updateField={updateField}
                      updateRecordField={updateRecordField}
                      organizationId={organizationId}
                      resourceId={resource.id}
                      field={field}
                      action="Update Field"
                    />
                  </Card>
                </Col>
              );
          }}
        />
      </Switch>
    </>
  );
};

export default FieldsContainer;
