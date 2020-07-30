import React, { useState, useEffect } from "react"
import { Form, Spin, Button } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import "./styles.scss"
import { useSelector, shallowEqual } from "react-redux"
import Field from "../Fields/FieldsList/Field"
import useMatchedRoute from "../NoMatch/useMatchedRoute"

export const CellForm = props => {
  const { record, formId, recordId, recordFieldId, organizationId } = props

  const match = useMatchedRoute()
  const { fields, recordFields, mappedValues } = useSelector(
    ({ fields, recordFields, mappedValues }) => ({
      fields,
      recordFields,
      mappedValues
    }),
    shallowEqual
  )
  const field = (fields[formId] || []).find(
    f => f.recordFieldId === recordFieldId
  )
  const currentValue =
    mappedValues.find(
      v => v.recordFieldId === recordFieldId && v.recordId === recordId
    ) || {}
  const [state, setState] = useState({
    id: currentValue.id,
    content: currentValue.content || "",
    contentAfterDependents: currentValue.contentAfterDependents,
    formId,
    recordId,
    recordFieldId,
    organizationId
  })
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ [recordFieldId]: state.content })
  }, [state])

  const suffix = loading ? (
    <Spin
      indicator={<LoadingOutlined style={{ fontSize: 14 }} spin />}
      style={{ marginRight: "5px" }}
    />
  ) : (
    <span style={{ display: "none" }} />
  )

  const handleChange = newState => {
    setLoading(false)
    setState({ ...state, ...newState })
  }

  const handleBlur = () => {
    if (!loading) props.handleBlur()
  }

  const onFinish = data => {
    const { updateRecord } = props
    setLoading(true)
    updateRecord({
      recordId,
      organizationId,
      formId,
      valuesAttributes: [state]
    })
      .then(() => setLoading(false))
      .then(() => props.handleBlur())
  }

  console.log(state)

  return (
    <Form
      layout={"inline"}
      form={form}
      size={"small"}
      onFinish={onFinish}
      style={{ padding: 0, margin: 0 }}
      className='custom-form'>
      <Field
        key={field.key}
        field={field}
        recordField={(recordFields[formId] || []).find(
          f => f.id === recordFieldId
        )}
        fields={field.fieldType === "key_field" ? fields : undefined}
        state={state}
        record={record}
        match={match}
        handleChange={handleChange}
        onBlur={
          ["boolean_field"].includes(field.fieldType) ? undefined : handleBlur
        }
        editingMode={true}
        style={{
          border: 0,
          outline: 0,
          padding: 0,
          margin: 0,
          width: "100%"
        }}
        suffix={suffix}
        onPressEnter={field.fieldType === "textarea" ? onFinish : undefined}
        autoFocus
      />
      {["boolean_field"].includes(field.fieldType) && (
        <Form.Item noStyle>
          <Button size={"small"} htmlType={"submit"} style={{ marginLeft: 5 }}>
            Save
          </Button>
        </Form.Item>
      )}
    </Form>
  )
}

export default React.memo(CellForm)
