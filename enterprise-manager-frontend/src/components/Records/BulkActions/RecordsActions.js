import React from "react"
import { Menu } from "antd"
import {
  SyncOutlined,
  PlusSquareOutlined,
  EditOutlined
} from "@ant-design/icons"
import { singular, plural } from "pluralize"
import useModal from "../../Modal/Hooks/useModal"
import SyncModal from "../Modals/ZohoBooks/SyncModal"
import UpdateAllModal from "../Modals/ZohoBooks/UpdateAllModal"
import CreateModal from "../Modals/ZohoBooks/CreateModal"

const RecordsActions = props => {
  const { resource, selectedRows } = props

  const syncModal = useModal()
  const createModal = useModal()
  const updateAllModal = useModal()

  if (!resource.zohoConnectionAttributes) return null
  const connectionType = singular(
    resource.zohoConnectionAttributes.connectionType
  )

  const connectionTypePlural = plural(connectionType)

  return (
    <>
      <Menu>
        <Menu.Item
          icon={<SyncOutlined />}
          onClick={() =>
            syncModal.showModal({
              text: (
                <>
                  Would you like to merge the selected {connectionTypePlural}{" "}
                  with the ZohoBooks {connectionTypePlural}? (If the{" "}
                  {connectionType} matches the ID from ZohoBooks, the values
                  will be replaced and this action can't be undone. You may use
                  the update all to Zoho first to sync all the current
                  information with ZohoBooks first).
                </>
              )
            })
          }>
          {selectedRows.length > 0 ? (
            <>
              Synchronize selected {connectionTypePlural} with Zoho (
              {selectedRows.length})
            </>
          ) : (
            <>Synchronize {connectionTypePlural} with Zoho</>
          )}
        </Menu.Item>
        <Menu.Item
          icon={<PlusSquareOutlined />}
          onClick={() => createModal.showModal()}>
          {selectedRows.length > 0 ? (
            <>
              Send selected {plural(connectionType)} to Zoho (
              {selectedRows.length})
            </>
          ) : (
            <>Send Unsynchronized {connectionTypePlural} to Zoho</>
          )}
        </Menu.Item>
        <Menu.Item
          icon={<EditOutlined />}
          onClick={() =>
            updateAllModal.showModal({
              text: (
                <>
                  The selected {connectionTypePlural} will replace any{" "}
                  {connectionType}
                  in ZohoBooks if they exist.
                </>
              )
            })
          }>
          {selectedRows.length > 0 ? (
            <>
              Update selected {plural(connectionType)} to Zoho (
              {selectedRows.length})
            </>
          ) : (
            <>Update all {connectionTypePlural} to Zoho</>
          )}
        </Menu.Item>
      </Menu>
      <SyncModal {...syncModal} {...props} connectionType={connectionType} />
      <CreateModal
        {...createModal}
        {...props}
        connectionType={connectionType}
      />
      <UpdateAllModal
        {...updateAllModal}
        {...props}
        connectionType={connectionType}
      />
    </>
  )
}

export default RecordsActions
