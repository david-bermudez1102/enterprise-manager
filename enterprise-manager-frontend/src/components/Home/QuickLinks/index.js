import React from "react"
import { Card, Button, List } from "antd"
import { Link } from "react-router-dom"
import { PlusOutlined } from "@ant-design/icons"

const links = [
  {
    title: "Link 1",
    href: ""
  },
  {
    title: "Link 2",
    href: ""
  },
  {
    title: "Link 3",
    href: ""
  },
  {
    title: "Link 4",
    href: ""
  },
  {
    title: "Link 5",
    href: ""
  },
  {
    title: "Link 6",
    href: ""
  }
]

const QuickLinks = () => {
  return (
    <Card
      style={{
        marginBottom: 24
      }}
      title='Quick Links'
      bordered={false}>
      <List
        dataSource={links}
        grid={{ gutter: 2, column: 4 }}
        renderItem={link => (
          <List.Item>
            <List.Item.Meta
              description={
                <Button block style={{ border: 0, textAlign: "left" }}>
                  <Link to={link.to} style={{ color: "inherit" }}>
                    {link.title}
                  </Link>
                </Button>
              }
            />
          </List.Item>
        )}
      />
      <Button size='small' type='dashed'>
        <PlusOutlined /> Add link
      </Button>
    </Card>
  )
}

export default QuickLinks
