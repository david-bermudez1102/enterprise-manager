import React, { useEffect, useCallback, useState } from "react"
import { Select, Form, Button, Tag } from "antd"
import { useSelector, shallowEqual, useDispatch } from "react-redux"
import { fetchAccounts } from "../../../actions/accountActions"

const Exclusion = props => {
  const { exclusionsAttributes, exclusionType, onFinish, onPopoverHide } = props

  const [options, setOptions] = useState([])
  const [searching, setSearching] = useState(false)

  const dispatch = useDispatch()
  const { accounts, session } = useSelector(
    ({ accounts, session }) => ({ accounts, session }),
    shallowEqual
  )

  const [selected, setSelected] = useState(
    exclusionsAttributes.map(e => ({
      ...e,
      label: accounts.find(a => a.id === e.accountId).name,
      value: e.accountId,
      dataset: { exclusionType }
    }))
  )

  useEffect(() => {
    dispatch(fetchAccounts(session.currentUser.organizationId))
  }, [dispatch])

  useEffect(() => {
    setSelected(
      exclusionsAttributes.map(e => ({
        ...e,
        label: accounts.find(a => a.id === e.accountId).name,
        value: e.accountId,
        dataset: { exclusionType }
      }))
    )
  }, [exclusionsAttributes, accounts, exclusionType])

  const onChange = (values, selected) => {
    setSelected(values.map(v => ({ ...v, dataset: { exclusionType } })))
    setSearching(false)
    setOptions([])
  }

  const handleFinish = useCallback(
    data => {
      onFinish(selected, exclusionType)
      onPopoverHide()
    },
    [selected, exclusionType, onFinish, onPopoverHide]
  )

  const onSearch = () => {
    setSearching(true)
    setOptions(
      accounts.map(acc => ({
        label: acc.name,
        value: acc.id,
        dataset: { exclusionType }
      }))
    )
  }

  return (
    <Form
      onFinish={handleFinish}
      wrapperCol={{ style: { padding: 0, margin: 0 } }}>
      <Form.Item style={{ marginBottom: 0 }}>
        <Select
          labelInValue
          optionFilterProp={"label"}
          onSearch={onSearch}
          onChange={onChange}
          notFoundContent={searching ? undefined : null}
          tagRender={({ label, onClose }) => (
            <Tag
              color={"blue"}
              closable
              onClose={onClose}
              style={{ marginRight: 3 }}>
              {label}
            </Tag>
          )}
          mode='multiple'
          size={"small"}
          showSearch
          style={{ width: "100%", maxWidth: "200px" }}
          placeholder='Please select'
          defaultValue={selected}
          options={options}
        />
      </Form.Item>
      <Form.Item style={{ marginBottom: 0 }}>
        <Button type={"primary"} htmlType={"submit"} size={"small"}>
          Save
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Exclusion
