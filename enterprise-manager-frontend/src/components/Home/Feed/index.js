import React from "react"
import { Card, Avatar, List, Empty } from "antd"

const data = [{ title: "David" }, { title: "David" }, { title: "David" }]

const MainFeed = () => {
  return (
    <Card title={"Recent Activity"} bordered={false}>
      <List
        itemLayout='horizontal'
        dataSource={data}
        locale={{ emptyText: <Empty description={"No recent activity yet"} /> }}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
              }
              title={<a href='https://ant.design'>{item.title}</a>}
              description='Ant Design, a design language for background applications, is refined by Ant UED Team'
            />
          </List.Item>
        )}
      />
    </Card>
  )
}

export default MainFeed
