import React, { useState, useEffect } from "react"
import { Col, Row, Divider, Alert, Card } from "antd"
import FieldForm from "../FieldForm"
import Title from "antd/lib/typography/Title"
import { addField, updateField } from "../../../actions/fieldActions"
import {
  addRecordField,
  updateRecordField
} from "../../../actions/recordFieldActions"
import { plural } from "pluralize"
import { useRouteMatch } from "react-router-dom"
import { useSelector, shallowEqual } from "react-redux"

const FieldFormLayout = ({ organizationId, resource }) => {
  const match = useRouteMatch()
  const { fields } = useSelector(({ fields }) => ({ fields }), shallowEqual)
  const field = (fields[resource.id] || []).find(
    field => field.id === parseInt(match.params.fieldId)
  )

  const currentlyConnectedTo = []
  if (resource.zohoConnectionAttributes)
    currentlyConnectedTo.push(
      `ZohoBooks through ${resource.zohoConnectionAttributes.connectionType}`
    )
  if (resource.quickbooksIntegrationAttributes)
    currentlyConnectedTo.push(
      `Quickbooks through ${resource.quickbooksIntegrationAttributes.connectionType}`
    )

  return (
    <Col span={24} xxl={12} xl={14} lg={12}>
      <Card
        bordered={false}
        bodyStyle={{ paddingTop: 0, paddingBottom: 0, margin: 0 }}>
        <Row justify={"center"} align={"middle"}>
          <Col
            xxl={20}
            xl={20}
            lg={24}
            span={18}
            style={{ padding: "10px 5px" }}>
            <Title level={2}>
              {field
                ? `Edit Field "${field.name}"`
                : `Add Field to ${plural(resource.name)}`}
            </Title>
            {currentlyConnectedTo.length > 0 ? (
              <Alert
                closable
                banner
                type={"success"}
                message={
                  <div>
                    This form is currently connected to{" "}
                    {currentlyConnectedTo.join(" and ")}.
                  </div>
                }
              />
            ) : (
              <Alert
                closable
                banner
                message={
                  <div>
                    This form is not currently connected to any accounting
                    software.
                  </div>
                }
              />
            )}
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
              resource={resource}
            />
          </Col>
        </Row>
      </Card>
    </Col>
  )
}

export default FieldFormLayout
