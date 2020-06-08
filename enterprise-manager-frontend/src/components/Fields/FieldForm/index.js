import React, { useState, useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import RecordKeyField from "./RecordKeyField"
import TextField from "./TextField"
import NumericField from "./NumericField"
import TextareaField from "./TextareaField"
import PasswordField from "./PasswordField"
import SelectableField from "./SelectableField"
import RadioField from "./RadioField"
import CheckBoxField from "./CheckBoxField"
import DateField from "./DateField"
import CombinedField from "./CombinedField"
import { Form, Input, Button, Row, Divider, Switch, Tooltip } from "antd"
import { AppstoreTwoTone, QuestionCircleTwoTone } from "@ant-design/icons"
import { useRouteMatch } from "react-router-dom"
import capitalize from "capitalize"

const FieldForm = props => {
  const { organizationId, action, resourceId, resource } = props
  const { key, fieldAlias, name, formId, isRequired, ...field } = props.field
  const [fieldState, setFieldState] = useState(field || {})
  const mounted = useRef()
  const match = useRouteMatch()
  const dispatch = useDispatch()
  const initalState = {
    name: name || "",
    formId: formId || resourceId,
    isRequired: isRequired || true
  }

  const [form] = Form.useForm()

  const [state, setState] = useState(initalState)

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
    } else {
      setFieldState(field || {})
      setState(initalState)
      form.setFieldsValue(initalState)
    }
    // eslint-disable-next-line
  }, [match])

  const onChange = state => {
    setFieldState(state)
  }

  const handleSubmit = e => {
    const { addField, updateField, updateRecordField } = props
    if (addField) {
      dispatch(addField({ ...state, ...fieldState }, organizationId)).then(() =>
        form.resetFields()
      )
    }
    if (updateField)
      dispatch(
        updateField({ ...state, ...fieldState }, organizationId, field.id)
      ).then(field =>
        field
          ? dispatch(
              updateRecordField(field, organizationId, field.recordFieldId)
            )
          : null
      )
  }

  console.log({ ...state, ...fieldState })

  const fieldProps = {
    field,
    fieldType: fieldState.fieldType || "",
    onChange
  }

  return (
    <Form
      form={form}
      name='new_field'
      onFinish={handleSubmit}
      layout={"vertical"}>
      <Form.Item
        name='name'
        label='Field Name'
        rules={[
          {
            required: true,
            message: "Please enter a valid field name!"
          }
        ]}>
        <Input
          size='large'
          id='field_name'
          onChange={e =>
            setState({
              ...state,
              name: e.target.value
            })
          }
          prefix={<AppstoreTwoTone />}
          placeholder='Enter field name...'
        />
      </Form.Item>
      <Divider />
      <Form.Item label='Field Type:' required>
        <Row gutter={[16, 16]}>
          <RecordKeyField resourceId={resourceId} {...fieldProps} />
          <TextField {...fieldProps} />
          <NumericField {...fieldProps} />
          <TextareaField {...fieldProps} />
          <PasswordField {...fieldProps} />
          <SelectableField {...fieldProps} />
          <RadioField {...fieldProps} />
          <CheckBoxField {...fieldProps} />
          <DateField {...fieldProps} />
          <CombinedField {...fieldProps} resourceId={resourceId} />
        </Row>
      </Form.Item>
      <Divider />
      {resource.zohoConnectionAttributes ? (
        <Form.Item name={"zohoFieldName"} label='ZohoBooks Field Name'>
          <Input
            placeholder={`Enter ZohoBooks field name`}
            suffix={
              <Tooltip
                title={
                  <span>
                    This will be used as an alias when sent to ZohoBooks. Click{" "}
                    <a
                      href={`https://www.zoho.com/books/api/v3/#${capitalize(
                        resource.zohoConnectionAttributes.connectionType
                      )}`}
                      target={"_blank"}
                      rel='noopener noreferrer'>
                      here
                    </a>{" "}
                    to see all API valid names.
                  </span>
                }>
                <QuestionCircleTwoTone />
              </Tooltip>
            }
          />
        </Form.Item>
      ) : null}
      {resource.quickbooksConnectionAttributes ? (
        <Form.Item name={"quickbooksFieldName"} label='Quickbooks Field Name'>
          <Input
            placeholder={`Enter Quickbooks field name`}
            suffix={
              <Tooltip title='prompt text'>
                <QuestionCircleTwoTone />
              </Tooltip>
            }
          />
        </Form.Item>
      ) : null}
      <Form.Item>
        <Form.Item label='Required'>
          <Switch
            name='isRequired'
            checked={state.isRequired}
            onChange={checked => setState({ ...state, isRequired: checked })}
          />
        </Form.Item>
        <Form.Item label='Uniq?'>
          <Switch
            name='isUniq'
            checked={state.isUniq}
            onChange={checked => setState({ ...state, isUniq: checked })}
          />
        </Form.Item>
      </Form.Item>
      <Divider />
      <Form.Item>
        <Button type='primary' htmlType='submit'>
          {action}
        </Button>
      </Form.Item>
    </Form>
  )
}
export default React.memo(FieldForm)
