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
import {
  CloseCircleOutlined,
  CloseOutlined,
  QuestionCircleOutlined
} from "@ant-design/icons"

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
    { label: "Concatenate", value: "concatenate" }
  ]

  const [selected, setSelected] = useState(
    (field.fieldDependents || []).map(dependent => ({
      label: dependent.label,
      value: dependent.dependentFieldId
    }))
  )
  const [dependents, setDependants] = useState(field.fieldDependents || [])

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
          ? { dependentFieldId: option["data-field-id"], operation: value }
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
    const { operation, content } =
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

    const style = { width: "100%" }
    const name = `${operation}_${dependentValue}`
    const size = "small"
    switch (operation) {
      case "add":
        return (
          <InputNumber
            size={size}
            name={name}
            placeholder={"Enter value that will be added"}
            style={style}
            onChange={handleChange}
            value={content}
          />
        )
      case "subtract":
        return (
          <InputNumber
            size={size}
            name={name}
            placeholder={"Enter value that will be subtracted"}
            style={style}
            onChange={handleChange}
            value={content}
          />
        )
      case "concatenate":
        return (
          <Input
            size={size}
            name={name}
            placeholder={"Enter string to concatenate"}
            style={style}
            onChange={e => handleChange(e.target.value)}
            value={content}
          />
        )
      default:
        return null
    }
  }

  console.log(dependents)

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
        renderItem={dependent => (
          <List.Item>
            <Row gutter={8} style={{ width: "100%" }} align={"middle"}>
              <Col>
                <Button
                  type={"text"}
                  size={"small"}
                  onClick={() => removeDependant(dependent)}>
                  <CloseOutlined />
                </Button>
                {dependent.label}
                {console.log(dependent)}
              </Col>
              <Col>
                <Input.Group>
                  <Select
                    value={
                      (
                        operations.find(o =>
                          dependents.some(
                            d =>
                              d.dependentFieldId === dependent.value &&
                              d.operation === o.value
                          )
                        ) || {}
                      ).value
                    }
                    size={"small"}
                    placeholder={"Select Operation"}
                    options={operations.map(o => ({
                      "data-field-id": dependent.value,
                      ...o
                    }))}
                    onChange={handleOperationsChange}
                  />
                  <Tooltip title={"The operation that will alter the field"}>
                    <Button type={"text"} size={"small"}>
                      <QuestionCircleOutlined />
                    </Button>
                  </Tooltip>
                </Input.Group>
              </Col>
              <Col flex={"auto"}>{renderOperationField(dependent.value)}</Col>
            </Row>
          </List.Item>
        )}
      />
    </>
  )
}

export default FieldDependant
