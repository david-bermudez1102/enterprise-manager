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
import { Form, Input, Button, Row, Divider, Switch, Tooltip, Col } from "antd"
import { AppstoreTwoTone, QuestionCircleTwoTone } from "@ant-design/icons"
import { useRouteMatch } from "react-router-dom"
import capitalize from "capitalize"
import AccountsField from "./AccountsField"
import "./styles.scss"
import BooleanField from "./BooleanField"

const FieldForm = props => {
  const { organizationId, action, resourceId, resource } = props
  const {
    key,
    fieldAlias,
    name,
    formId,
    isRequired,
    isUniq,
    hiddenInForm,
    hiddenInRecords,
    readOnly,
    allowUpdates,
    zohoFieldName,
    ...field
  } = props.field
  const [fieldState, setFieldState] = useState(field || {})
  const mounted = useRef()
  const match = useRouteMatch()
  const dispatch = useDispatch()
  const initalState = {
    name: name || "",
    formId: formId || resourceId,
    isRequired: isRequired,
    isUniq: isUniq,
    hiddenInForm,
    hiddenInRecords,
    readOnly,
    zohoFieldName,
    allowUpdates: field.id ? allowUpdates : true
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
  }, [match.params])

  const onChange = state => {
    setFieldState(state)
  }

  const handleSubmit = e => {
    const { addField, updateField } = props
    if (addField) {
      dispatch(addField({ ...state, ...fieldState }, organizationId)).then(() =>
        form.resetFields()
      )
    }
    if (updateField)
      dispatch(
        updateField({ ...state, ...fieldState, id: field.id }, organizationId)
      )
  }

  const fieldProps = {
    field,
    fieldType: fieldState.fieldType || "",
    resourceId,
    form,
    fieldState,
    onChange
  }

  const additionalOptions = [
    !["boolean_field"].includes(fieldState.fieldType) && {
      name: "isRequired",
      label: "Required?"
    },
    ["text"].includes(fieldState.fieldType) && {
      name: "isUniq",
      label: "Uniq?"
    },
    ["key_field", "combined_field"].includes(fieldState.fieldType) && {
      name: "hiddenInForm",
      label: "Hidden in form?"
    },
    { name: "hiddenInRecords", label: "Hidden in records?" },
    fieldState.fieldType === "combined_field" && {
      name: "readOnly",
      label: "Read only?"
    },
    { name: "allowUpdates", label: "Allow updates?" }
  ].filter(o => o)

  console.log(fieldState)

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
      <Form.Item label='Field Type:' required style={{ marginBottom: 0 }}>
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
          <AccountsField {...fieldProps} />
          <CombinedField {...fieldProps} />
          <BooleanField {...fieldProps} />
        </Row>
      </Form.Item>
      <Divider style={{ marginTop: 0 }} />
      {resource.zohoConnectionAttributes ? (
        <Form.Item name={"zohoFieldName"} label='ZohoBooks Field Name'>
          <Input
            placeholder={`Enter ZohoBooks field name`}
            onChange={e =>
              setState({ ...state, zohoFieldName: e.target.value })
            }
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
      <Form.Item
        label={"Additional Options"}
        style={{ margin: 0 }}
        className={"custom-form-item"}>
        <Row gutter={[4, 10]}>
          {additionalOptions.map((option, index) => (
            <Col
              style={{ fontSize: 13 }}
              key={`additional_option_${index}_${resourceId}`}
              xs={24}
              sm={12}
              md={8}
              lg={8}
              xl={6}
              xxl={6}>
              {option.label}
              <br />
              <Switch
                size={"small"}
                name={option.name}
                checked={state[option.name]}
                onChange={checked =>
                  setState({ ...state, [option.name]: checked })
                }
              />
            </Col>
          ))}
        </Row>
      </Form.Item>
      <Divider style={{ marginTop: 0 }} />
      <Form.Item>
        <Button type='primary' htmlType='submit' block>
          {action}
        </Button>
      </Form.Item>
    </Form>
  )
}
export default React.memo(FieldForm)
