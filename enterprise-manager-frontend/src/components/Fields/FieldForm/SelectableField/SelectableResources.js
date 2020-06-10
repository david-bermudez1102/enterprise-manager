import React, { useState, useEffect, useRef } from "react"
import { connect } from "react-redux"
import cuid from "cuid"
import SelectableResourcesOptions from "./SelectableResourcesOptions"
import { Divider, Select, Form } from "antd"

const SelectableResources = props => {
  const { field, resources, fields, handleSelectable } = props
  const { selectableResourceAttributes } = field
  const formId = selectableResourceAttributes
    ? selectableResourceAttributes.formId
    : null
  const mounted = useRef()

  const [selected, setSelected] = useState(formId || "")
  const [state, setState] = useState(selectableResourceAttributes || {})

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
    } else {
      handleSelectable({
        selectableResourceAttributes: {
          formId: selected,
          resourceFieldId: ""
        }
      })
    }
    // eslint-disable-next-line
  }, [selected])

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
    } else {
      handleSelectable({ selectableResourceAttributes: state })
      setSelected(state.formId || selected)
    }
    // eslint-disable-next-line
  }, [state])

  return (
    <>
      <Divider />
      <Form.Item name='formId' label={"Connect to"}>
        <Select
          name='formId'
          id='selectable_resource'
          onChange={value => setState({ ...state, formId: value })}
          value={selected}>
          <Select.Option value='' key={cuid()}>
            Select
          </Select.Option>
          {resources.map(resource => (
            <Select.Option value={resource.id} key={cuid()}>
              {resource.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <SelectableResourcesOptions
        resourceFieldId={
          selectableResourceAttributes
            ? selectableResourceAttributes.resourceFieldId || ""
            : ""
        }
        fields={fields}
        selected={selected}
        handleChange={value => setState({ ...state, resourceFieldId: value })}
      />
    </>
  )
}

const mapStateToProps = ({ resources, fields }) => {
  return { resources, fields }
}

export default connect(mapStateToProps)(SelectableResources)
