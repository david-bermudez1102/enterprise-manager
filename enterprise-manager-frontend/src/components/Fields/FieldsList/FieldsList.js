import React, { useState, useCallback, useEffect } from "react"
import Field from "./Field"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { addRecord } from "../../../actions/recordActions"
import { Link, useLocation } from "react-router-dom"
import { Empty, Card, Button, Divider, Form, Col } from "antd"
import zohoBooksIcon from "../../../containers/ZohoBooks/favicon.ico"
import Title from "antd/lib/typography/Title"
import { EyeTwoTone } from "@ant-design/icons"

const pluralize = require("pluralize")

const FieldsList = props => {
  const location = useLocation()
  const { match, resource, fields } = props
  const [state, setState] = useState([])
  const recordFields = useSelector(s => s.recordFields, shallowEqual)
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setState([])
  }, [resource])

  const handleChange = newState => {
    setState([
      ...state.filter(v => v.recordFieldId !== newState.recordFieldId),
      newState
    ])
  }

  const handleSubmit = useCallback(
    data => {
      form.resetFields()
      setLoading(true)
      dispatch(
        addRecord(
          { valuesAttributes: state },
          resource.organizationId,
          resource.id
        )
      ).then(() => setLoading(false))
    },
    // eslint-disable-next-line
    [state]
  )

  return (
    <Card bordered={false} bodyStyle={{ padding: 0 }}>
      <Col
        {...(location.pathname !== `${match.url}/new`
          ? { xxl: 20, xl: 24, lg: 24, span: 18 }
          : { span: 24 })}>
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
          tabList={[
            {
              key: `${match.url}/new/fields/new`,
              tab: (
                <Link to={`${match.url}/new/fields/new`} title='Add new field'>
                  <i
                    className='fad fa-plus-circle'
                    style={{ fontSize: "24px" }}></i>
                </Link>
              )
            },
            {
              key: `${match.url}/records`,
              tab: (
                <Link
                  to={`${match.url}/records`}
                  title={`View all ${resource.name}`}>
                  <i
                    className='fad fa-th-list'
                    style={{ fontSize: "24px" }}></i>
                </Link>
              )
            },
            {
              key: `${match.url}/connections/zoho/edit`,
              tab: (
                <Link
                  to={`${match.url}/connections/zoho/edit`}
                  title='Connect to Zoho Books'>
                  <img
                    src={zohoBooksIcon}
                    style={{ width: "24px", marginTop: -10 }}
                    alt='Connect with ZohoBooks'
                  />
                </Link>
              )
            }
          ]}>
          <Card.Meta
            title={
              <Title level={3}>Add {pluralize.singular(resource.name)}</Title>
            }
          />
          {fields.length > 0 ? (
            <Form
              name={`new_${resource.formAlias}`}
              form={form}
              onFinish={handleSubmit}
              layout='vertical'>
              {fields
                .filter(f => f)
                .map(field => {
                  const recordField = (recordFields[resource.id] || []).find(
                    f => f.fieldId === field.id
                  )
                  return recordField ? (
                    <Field
                      key={field.key}
                      field={field}
                      recordField={recordField}
                      form={form}
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
                  ) : null
                })}
              <Divider />
              <Button type='primary' htmlType='submit' loading={loading}>
                Create {pluralize.singular(resource.name)}
              </Button>
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
