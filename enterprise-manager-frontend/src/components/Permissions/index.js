import React, { useState } from "react"
import { List, Checkbox, Form, Button, Popover, Tooltip } from "antd"
import { useSelector, shallowEqual } from "react-redux"
import Exclusion from "./Exclusion"
import Text from "antd/lib/typography/Text"
import { PlusCircleOutlined } from "@ant-design/icons"
import Paragraph from "antd/lib/typography/Paragraph"

const assignments = [
  { name: "createPrivilege", description: "Create" },
  { name: "readPrivilege", description: "Read" },
  { name: "updatePrivilege", description: "Update" },
  { name: "insertPrivilege", description: "Insert" },
  { name: "deletePrivilege", description: "Delete" }
]

const Permissions = props => {
  const {
    onChange,
    onCheckAllChange,
    onExclusionChange,
    permissionAttributes,
    attrCount
  } = props
  const {
    assignmentsAttributes,
    exclusionsAttributes
  } = permissionAttributes || {
    assignmentsAttributes: [],
    exclusionsAttributes: []
  }

  const { roles, accounts } = useSelector(
    ({ roles, accounts }) => ({ roles, accounts }),
    shallowEqual
  )

  const [popoverVisible, setPopoverVisible] = useState({})

  const handleVisibleChange = (visible, assignment) => {
    setPopoverVisible({ ...popoverVisible, [assignment]: visible })
  }

  return (
    <List
      size={"small"}
      split={false}
      style={{ padding: 0 }}
      dataSource={assignments}
      renderItem={item => {
        const privilegeExclusions = exclusionsAttributes.filter(
          e => e.exclusionType === item.name && !e._destroy
        )
        return (
          <List.Item style={{ padding: 0 }}>
            <Form.Item
              label={item.description}
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 21 }}
              colon={false}
              style={{ width: "100%", minHeight: 55 }}>
              <Checkbox
                id={item.name}
                onChange={onCheckAllChange}
                indeterminate={
                  attrCount[item.name] && attrCount[item.name] < roles.length
                }
                checked={attrCount[item.name] === roles.length}>
                All
              </Checkbox>
              <Checkbox disabled checked={true}>
                Root
              </Checkbox>
              <Checkbox.Group
                style={{ marginBottom: 5 }}
                value={(assignmentsAttributes || []).map(a =>
                  a[item.name] ? a.roleId : undefined
                )}
                name={item.name}
                options={roles.map(role => ({
                  label: role.name,
                  value: role.id,
                  onChange
                }))}
              />
              <Popover
                visible={popoverVisible[item.name]}
                onVisibleChange={visible =>
                  handleVisibleChange(visible, item.name)
                }
                content={
                  <Exclusion
                    onPopoverHide={() =>
                      setPopoverVisible({
                        ...popoverVisible,
                        [item.name]: false
                      })
                    }
                    exclusionsAttributes={privilegeExclusions}
                    exclusionType={item.name}
                    onFinish={onExclusionChange}
                  />
                }
                title={<>"{item.description}" privilege exclusions</>}
                trigger='click'>
                {privilegeExclusions.length ? (
                  <Text
                    ellipsis
                    style={{ width: "100%", marginBottom: 5 }}
                    type={"secondary"}>
                    <strong>Accounts Excluded:</strong>{" "}
                    <Tooltip
                      overlayStyle={{ minWidth: "300px" }}
                      destroyTooltipOnHide
                      title={
                        <Paragraph
                          style={{ color: "#fff" }}
                          ellipsis={{
                            rows: 6,
                            expandable: true,
                            symbol: "more"
                          }}>
                          {privilegeExclusions.map(e => {
                            const account = accounts.find(
                              a => e.accountId === a.id
                            )
                            return (
                              <Text
                                key={`exclusion_key_${e.accountId}_${item.name}`}
                                title={account.email}
                                ellipsis
                                style={{ width: "100%", color: "#fff" }}>
                                {account.name} - {account.email}
                              </Text>
                            )
                          })}
                        </Paragraph>
                      }>
                      {privilegeExclusions
                        .map(p => accounts.find(a => p.accountId === a.id).name)
                        .join(", ")}
                    </Tooltip>
                  </Text>
                ) : null}
                {"  "}
                <Button type={"default"} size={"small"}>
                  <PlusCircleOutlined /> Add/Edit Exclusion
                </Button>
              </Popover>
            </Form.Item>
          </List.Item>
        )
      }}
    />
  )
}

export default Permissions
