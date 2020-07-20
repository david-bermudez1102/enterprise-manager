import React, { useState, useEffect } from "react"
import { useSelector, shallowEqual } from "react-redux"
import {
  Form,
  Select,
  Divider,
  List,
  InputNumber,
  Col,
  Input,
  Row,
  Button,
  Tooltip,
  Checkbox
} from "antd"
import { CloseOutlined, QuestionCircleOutlined } from "@ant-design/icons"

const operations = [
  { label: "Add", value: "add" },
  { label: "Subtract", value: "subtract" },
  { label: "Concatenate", value: "concatenate" },
  { label: "Multiply", value: "multiply" },
  { label: "Divide", value: "divide" },
  {
    label: "Replace",
    value: "replace",
    helper:
      "Field value will be replaced with dependent's value when it is not empty or 0. Leave value empty to replace dynamically. This will override all other operations."
  },
  {
    label: "Value + dependent times",
    value: "dependent_times"
  },
  {
    label: "Copy",
    value: "copy",
    helper:
      "Field value will be copied with dependent's value when it is not empty or 0."
  }
]

const FieldDependant = ({ field, resourceId, onChange }) => {
  const { fields } = useSelector(({ fields }) => ({ fields }), shallowEqual)
  const [options, setOptions] = useState(
    (fields[resourceId] || [])
      .map(f => ({
        label: f.name,
        value: f.id
      }))
      .filter(f =>
        field
          ? !(field.fieldDependents || []).some(
              dependent => f.value === dependent.dependentFieldId
            )
          : field
      )
  )

  const [selected, setSelected] = useState(
    (field.fieldDependents || []).map(dependent => ({
      id: dependent.id,
      label: dependent.label,
      value: dependent.dependentFieldId
    }))
  )
  const [dependents, setDependants] = useState(field.fieldDependents || [])
  const [allValuesSameOp, setAllValuesSameOp] = useState({})

  useEffect(() => {
    setSelected(
      (field.fieldDependents || []).map(dependent => ({
        id: dependent.id,
        label: dependent.label,
        value: dependent.dependentFieldId
      }))
    )
    setDependants(field.fieldDependents || [])
    // eslint-disable-next-line
  }, [field.id, field.fieldDependents])

  useEffect(() => {
    onChange({ fieldDependentsAttributes: dependents })
    // eslint-disable-next-line
  }, [dependents])

  const onSelectChange = (value, option) => {
    const fieldDependent = (fields[resourceId] || []).find(
      f => f.id === parseInt(value)
    )
    setOptions(options.filter(o => o.value !== value))
    setSelected([
      ...selected.filter(o => o.value !== value),
      { ...option, _destroy: undefined }
    ])
    setDependants([
      ...dependents.filter(d => d.dependentFieldId !== value),
      {
        ...dependents.find(d => d.dependentFieldId === value),
        dependentFieldId: value,

        _destroy: undefined
      }
    ])
    setAllValuesSameOp({
      ...allValuesSameOp,
      [value]: ["radio", "checkbox"].includes(fieldDependent.fieldType)
    })
  }

  const handleOperationsChange = (value, option) => {
    setDependants(
      dependents.map(dependent =>
        dependent.dependentFieldId === option["data-field-id"]
          ? {
              id: dependent.id,
              dependentFieldId: option["data-field-id"],
              operation: value
            }
          : dependent
      )
    )
  }

  const handleSubDependentsOperationsChange = (value, option) => {
    setDependants(
      dependents.map(dependent =>
        dependent.dependentFieldId === option["data-field-id"]
          ? {
              ...dependent,
              subDependentsAttributes: [
                ...(dependent.subDependentsAttributes || []).filter(
                  s => s.subDependentOptionId !== option["data-option-id"]
                ),
                {
                  subDependentOptionId: option["data-option-id"],
                  operation: value
                }
              ]
            }
          : dependent
      )
    )
  }

  const removeDependant = dependent => {
    setDependants(
      dependents.map(d =>
        d.dependentFieldId === dependent.value ? { ...d, _destroy: true } : d
      )
    )
    setOptions([...options, { ...dependent, _destroy: 1 }])
    setSelected(
      selected.map(d =>
        d.value === dependent.value ? { ...d, _destroy: 1 } : d
      )
    )
  }

  const renderOperationField = (dependentValue, subDependentOptionId) => {
    console.log(subDependentOptionId)
    const { operation, content, resourceFieldId, subDependentsAttributes } =
      dependents.find(d => d.dependentFieldId === parseInt(dependentValue)) ||
      {}
    const subDependent =
      (subDependentsAttributes || []).find(
        sD => sD.subDependentOptionId === parseInt(subDependentOptionId)
      ) || {}

    const handleChange = content => {
      setDependants(
        dependents.map(dependent =>
          dependent.dependentFieldId === dependentValue
            ? {
                ...dependent,
                content: subDependentOptionId ? undefined : content,
                subDependentsAttributes: [
                  ...(dependent.subDependentsAttributes || []).map(s =>
                    s.subDependentOptionId === subDependentOptionId
                      ? { ...s, content }
                      : s
                  )
                ],
                _destroy: undefined
              }
            : dependent
        )
      )
    }

    const handleSelectChange = resourceFieldId => {
      setDependants(
        dependents.map(dependent =>
          dependent.dependentFieldId === dependentValue
            ? { ...dependent, resourceFieldId, _destroy: undefined }
            : dependent
        )
      )
    }

    const fieldDependent = (fields[resourceId] || []).find(
      f => f.id === parseInt(dependentValue)
    )

    const style = { width: "100%" }
    const name = `${operation}_${dependentValue}`
    const size = "small"
    const inputProps = {
      name,
      size,
      style,
      onChange: handleChange,
      value: subDependent.content || content || resourceFieldId,
      allowClear: true
    }
    console.log(inputProps)
    switch (subDependent.operation || operation) {
      case "add":
        return (
          <InputNumber
            {...inputProps}
            placeholder={"Enter value that will be added"}
          />
        )
      case "subtract":
        return (
          <InputNumber
            {...inputProps}
            placeholder={"Enter value that will be subtracted"}
          />
        )
      case "divide":
        return (
          <InputNumber
            {...inputProps}
            placeholder={"Enter value that will be used to divide"}
          />
        )
      case "multiply":
        return (
          <InputNumber
            {...inputProps}
            placeholder={"Enter value to multiply"}
          />
        )
      case "dependent_times":
        return <InputNumber {...inputProps} placeholder={"Enter value"} />

      case "replace":
        if (field.fieldType === "numeric_field")
          return (
            <InputNumber
              {...inputProps}
              placeholder={"Enter value or leave empty for dynamic value"}
            />
          )
        return null

      case "concatenate":
        return (
          <Input
            {...inputProps}
            placeholder={"Enter string to concatenate"}
            onChange={e => handleChange(e.target.value)}
          />
        )

      case "copy":
        if (fieldDependent.fieldType === "selectable") {
          return (
            <Select
              {...inputProps}
              placeholder={"Select field to copy"}
              onChange={handleSelectChange}
              options={fields[
                fieldDependent.selectableResourceAttributes.formId
              ]
                .map(f =>
                  f.formId ===
                  parseInt(fieldDependent.selectableResourceAttributes.formId)
                    ? { value: f.id, label: f.name }
                    : null
                )
                .filter(f => f)}
            />
          )
        }
        return null

      default:
        return null
    }
  }

  return (
    <>
      <Form.Item
        name={"dependent_fields"}
        label={"Dependants"}
        help={"Every dependent will alter the field value"}
        required={false}
        initialValue={null}>
        <Select
          required
          onChange={onSelectChange}
          placeholder={"Select"}
          options={options}
        />
      </Form.Item>
      <Divider />
      <List
        itemLayout={"horizontal"}
        size={"small"}
        dataSource={selected.filter(s => !s._destroy)}
        renderItem={option => {
          const operation =
            operations.find(o =>
              dependents.some(
                d =>
                  d.dependentFieldId === option.value && d.operation === o.value
              )
            ) || {}

          const fieldDependent = (fields[resourceId] || []).find(
            f => f.id === parseInt(option.value)
          )

          return (
            <List.Item>
              <Row gutter={8} style={{ width: "100%" }} align={"middle"}>
                <Col span={24}>
                  <List.Item.Meta
                    title={
                      <>
                        <Button
                          type={"text"}
                          size={"small"}
                          onClick={() => removeDependant(option)}>
                          <CloseOutlined />
                        </Button>
                        {option.label}
                      </>
                    }
                  />
                </Col>
                {fieldDependent.fieldType === "radio" && (
                  <Col span={24}>
                    <Checkbox
                      name={"allValuesSameOp"}
                      defaultChecked={true}
                      onChange={e =>
                        setAllValuesSameOp({
                          [fieldDependent.id]: e.target.checked
                        })
                      }>
                      All values have the same operation
                    </Checkbox>
                  </Col>
                )}
                {(!allValuesSameOp[fieldDependent.id]
                  ? fieldDependent.optionsAttributes || []
                  : [option]
                ).map((o, i) => (
                  <React.Fragment
                    key={`operation_dependent_${i}-${fieldDependent.id}`}>
                    <Col span={12}>
                      <Select
                        required
                        value={operation.value}
                        size={"small"}
                        placeholder={"Select Operation"}
                        options={operations.map(operation => ({
                          ...operation,
                          "data-field-id": option.value,
                          "data-option-id":
                            ["radio", "checkbox"].includes(
                              fieldDependent.fieldType
                            ) && !allValuesSameOp[fieldDependent.id]
                              ? o.id
                              : undefined
                        }))}
                        onChange={
                          ["radio", "checkbox"].includes(
                            fieldDependent.fieldType
                          ) && !allValuesSameOp[fieldDependent.id]
                            ? handleSubDependentsOperationsChange
                            : handleOperationsChange
                        }
                      />
                    </Col>
                    <Col flex={"auto"}>
                      {renderOperationField(option.value, o.id)}
                    </Col>
                  </React.Fragment>
                ))}

                <Col>
                  <Tooltip
                    title={
                      operation.helper ||
                      "The operation that will alter the field"
                    }>
                    <Button type={"text"} size={"small"}>
                      <QuestionCircleOutlined />
                    </Button>
                  </Tooltip>
                </Col>
                <Col span={24}>
                  {operation.value === "copy" && (
                    <Checkbox name={"setAsStartValue"}>
                      Set as initial value{" "}
                      <Tooltip
                        title={
                          <>
                            If true, the field value won't be able to be
                            modified by the user, and it will be replaced by
                            dependent's value, but the other operations will run
                            with no problem.
                          </>
                        }>
                        <QuestionCircleOutlined />
                      </Tooltip>
                    </Checkbox>
                  )}
                </Col>
              </Row>
            </List.Item>
          )
        }}
      />
    </>
  )
}

export default FieldDependant
