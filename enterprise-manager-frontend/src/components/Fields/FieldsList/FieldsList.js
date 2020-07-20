import React, { useState, useCallback, useEffect } from "react"
import Field from "./Field"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { addRecord } from "../../../actions/recordActions"
import { Link, useLocation } from "react-router-dom"
import { Empty, Card, Button, Divider, Form, Col } from "antd"
import zohoBooksIcon from "../../../containers/ZohoBooks/favicon.ico"
import Title from "antd/lib/typography/Title"
import { EyeTwoTone, RedoOutlined } from "@ant-design/icons"
import useUserPermission from "../../Accounts/UserPermission/useUserPermission"
import "./styles.scss"
import MovableField from "./MovableField"
import update from "immutability-helper"
const pluralize = require("pluralize")

const FieldsList = props => {
  const location = useLocation()
  const { match, resource, fields } = props
  const [state, setState] = useState([])
  const [activeFields, setActiveFields] = useState(fields)
  const { recordFields } = useSelector(
    ({ recordFields }) => ({ recordFields }),
    shallowEqual
  )

  const userPermission = useUserPermission({ payload: resource })
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setState([])
  }, [resource])

  useEffect(() => {
    setActiveFields(fields)
  }, [fields])

  const handleChange = useCallback(
    newState => {
      setState([
        ...state.filter(v => v.recordFieldId !== newState.recordFieldId),
        {
          ...recordFields[resource.id].find(
            rF => rF.id === newState.recordFieldId
          ),
          ...newState
        }
      ])
    },
    [state, recordFields, resource.id]
  )

  const handleSubmit = useCallback(
    data => {
      setLoading(true)
      dispatch(
        addRecord(
          { valuesAttributes: state },
          resource.organizationId,
          resource.id
        )
      )
        .then(() => setLoading(false))
        .then(() => form.resetFields())
        .then(() => setState([]))
    },
    // eslint-disable-next-line
    [state]
  )

  const tabList = [
    userPermission.canCreate && {
      key: `${match.url}/new/fields/new`,
      tab: (
        <Link to={`${match.url}/new/fields/new`} title='Add new field'>
          <i className='fad fa-plus-circle' style={{ fontSize: "24px" }}></i>
        </Link>
      )
    },
    {
      key: `${match.url}/records`,
      tab: (
        <Link to={`${match.url}/records`} title={`View all ${resource.name}`}>
          <i className='fad fa-th-list' style={{ fontSize: "24px" }}></i>
        </Link>
      )
    },
    userPermission.canUpdate && {
      key: `${match.url}/connections/zoho/edit`,
      tab: (
        <Link
          to={`${match.url}/connections/zoho/edit`}
          title='Connect to Zoho Books'>
          <img
            src={zohoBooksIcon}
            style={{ width: "24px", marginTop: -5.5 }}
            alt='Connect with ZohoBooks'
          />
        </Link>
      )
    }
  ].filter(tab => tab)

  const moveField = useCallback(
    (dragIndex, hoverIndex) => {
      const dragField = activeFields[dragIndex]
      const newActiveFields = update(activeFields, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragField]
        ]
      })
      setActiveFields(newActiveFields)
    },
    [activeFields]
  )

  console.log(state)

  return (
    <Card
      bordered={false}
      bodyStyle={{ padding: 0, display: "flex", justifyContent: "center" }}>
      <Col
        {...(location.pathname !== `${match.url}/new`
          ? { xxl: 20, xl: 24, lg: 24, span: 18 }
          : { span: 24 })}
        flex={"auto"}>
        <Card
          bordered={false}
          activeTabKey={location.pathname}
          title={
            location.pathname === `${match.url}/new/fields/new` ? (
              <Title level={2}>
                <EyeTwoTone /> Resource Preview
              </Title>
            ) : undefined
          }
          tabList={tabList}>
          <Card.Meta
            title={
              <Title level={3}>Add {pluralize.singular(resource.name)}</Title>
            }
          />
          {fields.length > 0 ? (
            <Form
              className={"field-custom-form-item"}
              style={{ userSelect: "none" }}
              name={`new_${resource.formAlias}`}
              form={form}
              onFinish={handleSubmit}
              layout='vertical'
              draggable={false}>
              {activeFields
                .filter(f => f)
                .map((field, index) => {
                  const recordField = (recordFields[resource.id] || []).find(
                    f => f.fieldId === field.id
                  )
                  return recordField ? (
                    <MovableField
                      permission={userPermission}
                      resource={resource}
                      activeFields={activeFields}
                      key={field.key}
                      index={index}
                      moveField={moveField}>
                      <Field
                        userPermission={userPermission}
                        field={field}
                        recordField={recordField}
                        form={form}
                        fields={
                          field.fieldType === "key_field" ? fields : undefined
                        }
                        state={state}
                        match={match}
                        handleChange={handleChange}
                      />
                    </MovableField>
                  ) : null
                })}
              <Divider />
              <Form.Item className={"custom-form-item"}>
                <Button
                  type='primary'
                  htmlType='submit'
                  loading={loading}
                  style={{ flex: 1, marginRight: 5 }}>
                  Create {pluralize.singular(resource.name)}
                </Button>
                <Button
                  style={{ flex: 1 }}
                  onClick={() => form.resetFields()}
                  icon={<RedoOutlined />}>
                  Reset
                </Button>
              </Form.Item>
            </Form>
          ) : (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={"This form doesn't have any fields yet."}
            />
          )}
        </Card>
      </Col>
    </Card>
  )
}

export default FieldsList
