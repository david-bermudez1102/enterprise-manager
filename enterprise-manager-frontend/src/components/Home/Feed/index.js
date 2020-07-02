import React from "react"
import { Card, List, Empty, Button } from "antd"
import ActiviySubject from "./Subject"
import { useSelector, shallowEqual } from "react-redux"
import ActivityWebSocket from "../../WebSockets/ActivityWebSocket"
import { MoreOutlined } from "@ant-design/icons"
import IconWrapper from "../../Icons/IconWrapper"

const MainFeed = () => {
  const { stories } = useSelector(({ stories }) => ({ stories }), shallowEqual)
  return (
    <Card
      title={
        <>
          <IconWrapper
            className='fal fa-list-alt'
            style={{ marginRight: 10 }}
          />
          Recent Activity
        </>
      }
      bordered={false}>
      <ActivityWebSocket />
      <List
        size={"small"}
        itemLayout={"vertical"}
        dataSource={stories}
        locale={{ emptyText: <Empty description={"No recent activity yet"} /> }}
        renderItem={item => (
          <List.Item
            extra={[
              <Button type={"text"}>
                <MoreOutlined />
              </Button>
            ]}>
            <ActiviySubject {...item} />
          </List.Item>
        )}
      />
    </Card>
  )
}

export default MainFeed
