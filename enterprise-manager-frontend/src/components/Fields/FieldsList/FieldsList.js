import React, { useState, useCallback, useEffect } from "react";
import Field from "./Field";
import { useSelector, shallowEqual } from "react-redux";
import { addRecord } from "../../../actions/recordActions";
import { Link, useLocation } from "react-router-dom";
import { Empty, Card, Button, Divider, Form } from "antd";
import zohoBooksIcon from "../../../containers/ZohoBooks/favicon.ico";
import useLoader from "../../Loader/useLoader";
import Title from "antd/lib/typography/Title";

const pluralize = require("pluralize");

const FieldsList = props => {
  const location = useLocation();
  const { match, resource, fields } = props;
  const [state, setState] = useState([]);
  const recordFields = useSelector(s => s.recordFields, shallowEqual);
  const { loading, dispatchWithLoader } = useLoader();

  useEffect(() => {
    setState([]);
  }, [resource]);

  const handleChange = newState => {
    setState([
      ...state.filter(v => v.recordFieldId !== newState.recordFieldId),
      newState,
    ]);
  };

  const handleSubmit = useCallback(
    data => {
      dispatchWithLoader(
        addRecord(
          { valuesAttributes: state },
          resource.organizationId,
          resource.id
        )
      );
    },
    // eslint-disable-next-line
    [state]
  );

  console.log(state);

  return (
    <>
      <Card
        activeTabKey={location.pathname}
        tabList={[
          {
            key: `${match.url}/fields/new`,
            tab: (
              <Link to={`${match.url}/fields/new`} title="Add new field">
                <i
                  className="fad fa-plus-circle"
                  style={{ fontSize: "24px" }}></i>
              </Link>
            ),
          },
          {
            key: `${match.url}/records`,
            tab: (
              <Link
                to={`${match.url}/records`}
                title={`View all ${resource.name}`}>
                <i className="fad fa-th-list" style={{ fontSize: "24px" }}></i>
              </Link>
            ),
          },
          {
            key: `${match.url}/connections/zoho/edit`,
            tab: (
              <Link
                to={`${match.url}/connections/zoho/edit`}
                title="Connect to Zoho Books">
                <img
                  src={zohoBooksIcon}
                  style={{ width: "24px", marginTop: -10 }}
                  alt="Connect with ZohoBooks"
                />
              </Link>
            ),
          },
        ]}>
        <Card.Meta
          title={
            <Title level={3}>Add {pluralize.singular(resource.name)}</Title>
          }
        />
        {fields.length > 0 ? (
          <Form
            name={`new_${resource.formAlias}`}
            onFinish={handleSubmit}
            layout="vertical">
            {fields
              .filter(f => f)
              .map(field => {
                const recordField = recordFields
                  .filter(recordField => recordField.formId === resource.id)
                  .find(f => f.fieldId === field.id);
                return recordField ? (
                  <Field
                    key={field.key}
                    field={field}
                    recordField={recordField}
                    fields={
                      field.fieldType === "key_field" ? fields : undefined
                    }
                    state={
                      field.fieldType === "combined_field" ||
                      field.fieldType === "key_field"
                        ? state
                        : undefined
                    }
                    match={match}
                    handleChange={handleChange}
                  />
                ) : null;
              })}
            <Divider />
            <Button type="primary" htmlType="submit">
              Create {pluralize.singular(resource.name)}
            </Button>
          </Form>
        ) : (
          <Empty description={"This form doesn't have any fields yet."} />
        )}
      </Card>
    </>
  );
};

export default FieldsList;
