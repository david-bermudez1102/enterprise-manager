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
  Tooltip
} from "antd"
import { CloseOutlined, QuestionCircleOutlined } from "@ant-design/icons"

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
        "Field value will be replaced with dependent's value when it is not empty or 0"
    },
    { label: "Value + dependent times", value: "dependent_times" },
    { label: "Copy", value: "copy" }
  ]

  const [selected, setSelected] = useState(
    (field.fieldDependents || []).map(dependent => ({
      id: dependent.id,
      label: dependent.label,
      value: dependent.dependentFieldId
    }))
  )
  const [dependents, setDependants] = useState(field.fieldDependents || [])

  useEffect(() => {
    setSelected(
      (field.fieldDependents || []).map(dependent => ({
        id: dependent.id,
        label: dependent.label,
        value: dependent.dependentFieldId
      }))
    )
    setDependants(field.fieldDependents || [])
  }, [field.id])

  useEffect(() => {
    onChange({ fieldDependentsAttributes: dependents })
  }, [dependents])

  const onSelectChange = (value, option) => {
    setOptions(options.filter(o => o.value !== value))
    setSelected([...selected, option])
    setDependants([...dependents, { dependentFieldId: value }])
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

  const removeDependant = dependent => {
    setDependants(
      dependents.filter(d => d.dependentFieldId !== dependent.value)
    )
    setOptions([...options, dependent])
    setSelected(selected.filter(o => o.value !== dependent.value))
  }

  const renderOperationField = dependentValue => {
    const { operation, content, resourceFieldId } =
      dependents.find(d => d.dependentFieldId === parseInt(dependentValue)) ||
      {}

    const handleChange = content => {
      setDependants(
        dependents.map(dependent =>
          dependent.dependentFieldId === dependentValue
            ? { ...dependent, content }
            : dependent
        )
      )
    }

    const handleSelectChange = resourceFieldId => {
      setDependants(
        dependents.map(dependent =>
          dependent.dependentFieldId === dependentValue
            ? { ...dependent, resourceFieldId }
            : dependent
        )
      )
    }

    const field = (fields[resourceId] || []).find(
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
      value: content || resourceFieldId
    }
    switch (operation) {
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

      case "concatenate":
        return (
          <Input
            {...inputProps}
            placeholder={"Enter string to concatenate"}
            onChange={e => handleChange(e.target.value)}
          />
        )

      case "copy":
        console.log(dependents)
        if (field.fieldType === "selectable") {
          return (
            <Select
              {...inputProps}
              placeholder={"Select field to copy"}
              onChange={handleSelectChange}
              options={fields[field.selectableResourceAttributes.formId]
                .map(f =>
                  f.formId ===
                  parseInt(field.selectableResourceAttributes.formId)
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
        label={"Dependants"}
        help={"Every dependent will alter the field value"}>
        <Select
          onChange={onSelectChange}
          placeholder={"Select"}
          options={options}
          value={null}
        />
      </Form.Item>
      <Divider />
      <List
        itemLayout={"horizontal"}
        size={"small"}
        dataSource={selected}
        renderItem={option => (
          <List.Item>
            <Row gutter={8} style={{ width: "100%" }} align={"middle"}>
              <Col>
                <Button
                  type={"text"}
                  size={"small"}
                  onClick={() => removeDependant(option)}>
                  <CloseOutlined />
                </Button>
                {option.label}
              </Col>
              <Col>
                <Input.Group>
                  <Select
                    value={
                      (
                        operations.find(o =>
                          dependents.some(
                            d =>
                              d.dependentFieldId === option.value &&
                              d.operation === o.value
                          )
                        ) || {}
                      ).value
                    }
                    size={"small"}
                    placeholder={"Select Operation"}
                    options={operations.map(o => ({
                      "data-field-id": option.value,
                      ...o
                    }))}
                    onChange={handleOperationsChange}
                  />
                  <Tooltip
                    title={
                      (
                        operations.find(o =>
                          dependents.some(
                            d =>
                              d.dependentFieldId === option.value &&
                              d.operation === o.value
                          )
                        ) || {}
                      ).helper || "The operation that will alter the field"
                    }>
                    <Button type={"text"} size={"small"}>
                      <QuestionCircleOutlined />
                    </Button>
                  </Tooltip>
                </Input.Group>
              </Col>
              <Col flex={"auto"}>{renderOperationField(option.value)}</Col>
            </Row>
          </List.Item>
        )}
      />
    </>
  )
}

export default FieldDependant
