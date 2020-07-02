import React from "react"
import { Card, Avatar } from "antd"
import { Link } from "react-router-dom"
import { format } from "date-fns"
import { MoreOutlined, ApiTwoTone, ApiFilled } from "@ant-design/icons"
import IconWrapper from "../../Icons/IconWrapper"

const titles = [
  "Alipay",
  "Angular",
  "Ant Design",
  "Ant Design Pro",
  "Bootstrap",
  "React",
  "Vue",
  "Webpack"
]

const avatars = [
  "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png", // Alipay
  "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png", // Angular
  "https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png", // Ant Design
  "https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png", // Ant Design Pro
  "https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png", // Bootstrap
  "https://gw.alipayobjects.com/zos/rmsportal/kZzEzemZyKLKFsojXItE.png", // React
  "https://gw.alipayobjects.com/zos/rmsportal/ComBAopevLwENQdKWiIn.png", // Vue
  "https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png" // Webpack
]

const projectNotice = [
  {
    id: "xxx1",
    title: "Integrations",
    icon: "fal fa-plug",
    updatedAt: new Date(),
    href: "",
    memberLink: ""
  },
  {
    id: "xxx2",
    title: "Accounts",
    icon: "fal fa-users",
    updatedAt: new Date("2017-07-24"),
    href: "",
    memberLink: ""
  },
  {
    id: "xxx3",
    title: "Messages",
    icon: "fal fa-comments-alt",
    updatedAt: new Date(),
    href: "",
    memberLink: ""
  },
  {
    id: "xxx4",
    title: "Roles",
    icon: "fal fa-tags",
    updatedAt: new Date("2017-07-23"),
    href: "",
    memberLink: ""
  },
  {
    id: "xxx5",
    title: "Permissions",
    icon: "fal fa-shield-check",
    updatedAt: new Date("2017-07-23"),
    href: "",
    memberLink: ""
  },
  {
    id: "xxx6",
    title: "Tasks",
    icon: "fal fa-tasks",
    updatedAt: new Date("2017-07-23"),
    href: "",
    memberLink: ""
  }
]

const MainMenu = () => {
  return (
    <Card
      style={{
        marginBottom: 16
      }}
      title='Home'
      bordered={false}
      extra={<MoreOutlined />}
      bodyStyle={{
        padding: 0
      }}>
      {projectNotice.map(item => (
        <Card.Grid
          key={item.id}
          style={{
            display: "flex",
            flex: 1
          }}>
          <Card
            style={{
              width: "100%"
            }}
            bodyStyle={{
              padding: 0,
              width: "100%"
            }}
            bordered={false}>
            <Card.Meta
              avatar={
                <IconWrapper className={item.icon} style={{ fontSize: 22 }} />
              }
              description={item.title}
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                fontSize: 18
              }}
            />
          </Card>
        </Card.Grid>
      ))}
    </Card>
  )
}

export default MainMenu
