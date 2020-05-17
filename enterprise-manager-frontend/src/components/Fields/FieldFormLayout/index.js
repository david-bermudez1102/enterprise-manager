import React, { useState, useEffect } from "react";
import { Col, Row, Divider } from "antd";
import FieldForm from "../FieldForm";
import Title from "antd/lib/typography/Title";
import { addField, updateField } from "../../../actions/fieldActions";
import {
  addRecordField,
  updateRecordField,
} from "../../../actions/recordFieldActions";
import { plural } from "pluralize";
import { useRouteMatch, useLocation } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";

const FieldFormLayout = ({ organizationId, resource }) => {
  const location = useLocation();
  const match = useRouteMatch();
  const { fields } = useSelector(({ fields }) => ({ fields }), shallowEqual);
  const [field, setField] = useState(
    (fields[resource.id] || []).find(
      field => field.id === parseInt(match.params.fieldId)
    )
  );
  useEffect(() => {
    setField(
      (fields[resource.id] || []).find(
        field => field.id === parseInt(match.params.fieldId)
      )
    );
    // eslint-disable-next-line
  }, [location]);

  return (
    <Col span={24}>
      <Row justify={"center"} align={"middle"} style={{ background: "#fff" }}>
        <Col xl={14} lg={16} md={24} style={{ padding: "10px 5px" }}>
          <Title level={2}>
            {field
              ? `Edit Field "${field.name}"`
              : `Add Field to ${plural(resource.name)}`}
          </Title>
          <Divider />
          <FieldForm
            addField={field ? undefined : addField}
            updateField={field ? updateField : undefined}
            addRecordField={field ? undefined : addRecordField}
            updateRecordField={field ? updateRecordField : undefined}
            field={field ? field : {}}
            action={field ? "Update Field" : "Add Field"}
            organizationId={organizationId}
            resourceId={resource.id}
          />
        </Col>
      </Row>
    </Col>
  );
};

export default FieldFormLayout;
