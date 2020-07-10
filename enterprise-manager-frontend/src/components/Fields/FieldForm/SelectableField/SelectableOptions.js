import React, { useState, useEffect } from "react"
import cuid from "cuid"
import { Form, Button, Divider, Input, Tag } from "antd"

const SelectableOptions = props => {
  const { optionsAttributes } = props.field
  const itemValue = React.useRef()
  const [state, setState] = useState({
    itemValue: "",
    optionsAttributes: optionsAttributes || []
  })

  useEffect(() => {
    setState({ ...state, optionsAttributes: optionsAttributes || [] })
    // eslint-disable-next-line
  }, [optionsAttributes])

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  const handleClick = event => {
    event.persist()
    event.preventDefault()
    const optionsAttributes = [
      ...state.optionsAttributes.filter(o => o.value !== state.itemValue),
      state.optionsAttributes.some(o => o.value === state.itemValue)
        ? {
            ...state.optionsAttributes.find(o => o.value === state.itemValue),
            _destroy: undefined
          }
        : { value: state.itemValue }
    ]
    if (itemValue.current.value !== "") {
      setState({
        ...state,
        optionsAttributes,
        itemValue: ""
      })
      props.handleSelectable({
        optionsAttributes
      })
    }
    itemValue.current.focus()
  }

  const removeItem = value => {
    const { handleSelectable } = props
    const optionsAttributes = [
      ...state.optionsAttributes.map(option =>
        option.value === value ? { ...option, _destroy: 1 } : option
      )
    ]
    setState({
      itemValue: "",
      optionsAttributes
    })
    handleSelectable({
      optionsAttributes
    })
  }

  return (
    <>
      <Form.Item>
        {state.optionsAttributes
          .filter(option => !option._destroy)
          .map(option => (
            <Tag
              className='edit-tag'
              key={cuid()}
              closable
              onClose={() => removeItem(option.value)}>
              {option.value}
            </Tag>
          ))}
      </Form.Item>
      <Divider />
      <Form.Item label={`Add item to ${props.fieldType} field`}>
        <Input
          name='itemValue'
          id='item_value'
          onChange={handleChange}
          value={state.itemValue}
          autoFocus={true}
          ref={itemValue}
        />
      </Form.Item>
      <Button onClick={handleClick} className='btn btn-secondary shadow'>
        {state.optionsAttributes.length === 0 ? "Add Item" : "Add Another Item"}
      </Button>
    </>
  )
}

export default React.memo(SelectableOptions)
