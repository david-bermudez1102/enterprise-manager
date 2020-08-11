import React, { useState, useEffect } from "react"
import { Form, Spin } from "antd"
import { LoadingOutlined } from "@ant-design/icons"
import "./styles.scss"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import Field from "../Fields/FieldsList/Field"
import useMatchedRoute from "../NoMatch/useMatchedRoute"
import { updateRecord } from "../../actions/recordActions"

export const CellForm = props => {
  const {
    record,
    formId,
    recordId,
    recordFieldId,
    organizationId,
    isTypeableField
  } = props
  const dispatch = useDispatch()

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
    recordValueId: record.recordValueId,
    recordFieldId,
    organizationId,
    optionId: currentValue.optionId
  })
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({ [recordFieldId]: state.content })
    // eslint-disable-next-line
  }, [form])

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
    if (!isTypeableField)
      dispatch(
        updateRecord({
          recordId,
          organizationId,
          formId,
          valuesAttributes: [{ ...state, ...newState }]
        })
      )
  }

  const handleBlur = () => {
    if (!loading) props.handleBlur()
  }

  const onFinish = data => {
    console.log(state.content, currentValue.content)
    if (state.content !== currentValue.content)
      dispatch(
        updateRecord({
          recordId,
          organizationId,
          formId,
          valuesAttributes: [state]
        })
      ).then(props.handleBlur)
    else props.handleBlur()
  }

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
          ["boolean_field"].includes(field.fieldType) ? undefined : onFinish
        }
        editingMode={true}
        style={{
          border: 0,
          outline: 0,
          padding: 0,
          margin: 0,
          width: "100%",
          boxShadow: "none",
          background: "transparent"
        }}
        suffix={suffix}
        onPressEnter={field.fieldType === "textarea" ? onFinish : undefined}
        autoFocus
      />
    </Form>
  )
}

export default React.memo(CellForm)
