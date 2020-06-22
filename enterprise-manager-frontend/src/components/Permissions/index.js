import React, { useState } from "react"
import { List, Checkbox, Form, Button, Popover, Tooltip } from "antd"
import { useSelector, shallowEqual } from "react-redux"
import Exclusion from "./Exclusion"
import Text from "antd/lib/typography/Text"
import { PlusCircleOutlined } from "@ant-design/icons"
import Paragraph from "antd/lib/typography/Paragraph"
import IconWrapper from "../Icons/IconWrapper"

const Permissions = props => {
  const {
    onPermissionsChange,
    onCheckAllChange,
    onExclusionChange,
    permissionAttributes,
    attrCount,
    exclude
  } = props

  const assignments = [
    {
      name: "createPrivilege",
      icon: "fal fa-plus-square",
      description: props.createLabel || "Create"
    },
    {
      name: "readPrivilege",
      icon: "fal fa-eye",
      description: props.readLabel || "Read"
    },
    {
      name: "updatePrivilege",
      icon: "fal fa-edit",
      description: props.updateLabel || "Update"
    },
    {
      name: "insertPrivilege",
      icon: "fal fa-layer-plus",
      description: props.insertLabel || "Insert"
    },
    {
      name: "deletePrivilege",
      icon: "fal fa-trash-alt",
      description: props.deleteLabel || "Delete"
    }
  ]

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
      style={{
        padding: 0,
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: "center"
      }}
      dataSource={assignments.filter(a => !(exclude || []).includes(a.name))}
      renderItem={item => {
        const privilegeExclusions = exclusionsAttributes.filter(
          e => e.exclusionType === item.name && !e._destroy
        )
        return (
          <List.Item style={{ padding: 0 }}>
            <Form.Item
              label={
                <Button
                  style={{ padding: 0, width: "100%" }}
                  block
                  type={"text"}
                  icon={<IconWrapper className={item.icon} />}>
                  {item.description}
                </Button>
              }
              labelCol={{
                span: 24,
                style: { marginBottom: 0, padding: 0, width: "inherit" }
              }}
              colon={false}
              style={{
                width: "auto",
                maxWidth: "100%",
                minHeight: 55,
                marginBottom: 10
              }}>
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
                  onChange: onPermissionsChange
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
                {"  "}
                <Button
                  type={"dashed"}
                  size={"small"}
                  icon={<PlusCircleOutlined />}
                  style={{ background: "transparent" }}>
                  Add/Edit Exclusion
                </Button>
                <br />
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
              </Popover>
            </Form.Item>
          </List.Item>
        )
      }}
    />
  )
}

export default Permissions
