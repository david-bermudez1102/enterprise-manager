import React from "react"
import { Alert } from "antd"
import IconWrapper from "../../Icons/IconWrapper"
import { CloseOutlined } from "@ant-design/icons"

const NewMessage = ({ haveNewMessages, messagesEndRef }) => {
  return haveNewMessages ? (
    <div
      style={{
        position: "absolute",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        zIndex: 2
      }}>
      <Alert
        showIcon={true}
        icon={
          <span
            style={{
              color: "#fff",
              margin: 0,
              padding: 0,
              top: "auto"
            }}>
            <IconWrapper
              className={"fal fa-chevron-circle-down"}
              style={{ color: "#fff" }}
            />
          </span>
        }
        message={<span style={{ color: "#fff" }}>New messages!</span>}
        type={"warning"}
        onClick={() => {
          messagesEndRef.scrollIntoView({
            block: "end",
            behavior: "smooth"
          })
          messagesEndRef.scrollTop += 50
        }}
        style={{
          position: "fixed",
          background: "rgba(0, 0, 0, 0.6)",
          border: 0
        }}
        closable
        closeText={<CloseOutlined style={{ color: "#fff" }} />}
      />
    </div>
  ) : null
}

export default React.memo(NewMessage)
