import React, { useState, useEffect, useRef } from "react"
import cuid from "cuid"
import { Select, Form, Divider } from "antd"

const SelectableResourcesOptions = props => {
  const { fields, selected, resourceFieldId } = props

  const mounted = useRef()

  const [state, setState] = useState({ value: resourceFieldId })

  const handleChange = value => {
    setState({ value: value })
    props.handleChange(value)
  }

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
    } else {
      setState({ value: "" })
    }
  }, [selected])

  return (
    fields[selected] && (
      <>
        <Divider />
        <Form.Item label='Column'>
          <Select
            name='resourceFieldId'
            onChange={handleChange}
            value={state.value}
            className='form-control'
            id='selectable_resource_options'>
            <Select.Option value='' key={cuid()}>
              Select
            </Select.Option>
            {fields[selected].map(field =>
              field.formId === parseInt(selected) ? (
                <Select.Option value={field.id} key={cuid()}>
                  {field.name}
                </Select.Option>
              ) : null
            )}
          </Select>
        </Form.Item>
        <Form.Item label='Allow Changes for'>

        </Form.Item>
      </>
    )
  )
}

export default SelectableResourcesOptions
