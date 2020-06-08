import React from "react"
import snakecaseKeys from "snakecase-keys"
import { handleErrors } from "./handleErrors"
import { message, Modal, List } from "antd"
import { plural } from "pluralize"
import {
  CloseCircleOutlined,
  CheckCircleOutlined,
  InfoCircleTwoTone
} from "@ant-design/icons"
import Text from "antd/lib/typography/Text"
import Title from "antd/lib/typography/Title"

export const zohoApi = (zohoResource, type, action, body) => {
  const zoho_path = `/api/v1/organizations/${zohoResource.organizationId}/forms/${zohoResource.formId}/zoho_books`

  const paths = {
    contact: `${zoho_path}/contacts/${action}`,
    item: `${zoho_path}/items/${action}`,
    invoice: `${zoho_path}/invoices/${action}`
  }

  return dispatch =>
    fetch(paths[type], {
      cache: "no-cache",
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(snakecaseKeys({ [type]: { body } }))
    })
      .then(handleErrors)
      .then(response => response.json())
      .then(records => {
        if (!records.errors) {
          let successCount = 0
          const errors = []
          records.forEach(record => {
            if (!record.error) {
              dispatch({
                type: "UPDATE_OR_CREATE_RECORD",
                record: record.links.values
              })
              successCount++
            } else {
              errors.push(record)
            }
          })
          return { successCount, errors }
        } else {
          throw new Error(records.errors)
        }
      })
      .then(({ successCount, errors }) =>
        Modal.info({
          zIndex: 2000,
          title: "This is a notification message",
          content: (
            <div>
              <p>
                <Text style={{ color: "green" }}>
                  <CheckCircleOutlined />
                </Text>{" "}
                {successCount} {plural(type)} succeded
              </p>
              <p>
                <Text type={"danger"}>
                  <CloseCircleOutlined />
                </Text>{" "}
                {errors.length} {plural(type)} failed
              </p>
              {errors.length > 0 ? (
                <>
                  <Title level={4}>Log</Title>
                  <List
                    size={"small"}
                    style={{
                      maxHeight: 200,
                      overflowY: "auto"
                    }}
                    dataSource={errors}
                    itemLayout={"horizontal"}
                    renderItem={item => (
                      <List.Item style={{ paddingRight: 0, paddingLeft: 0 }}>
                        <a
                          href={`/organizations/${
                            zohoResource.organizationId
                          }/resources/${plural(type)}/records/${item.recordId}`}
                          target={"_blank"}
                          rel='noopener noreferrer'>
                          <InfoCircleTwoTone /> {item.error}
                        </a>
                      </List.Item>
                    )}
                  />
                </>
              ) : null}
            </div>
          ),
          onOk() {}
        })
      )
      .catch(resp => message.error(resp.toString()), 15)
}
