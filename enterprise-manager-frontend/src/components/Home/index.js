import React from "react"
import { useSelector, shallowEqual } from "react-redux"
import { PageHeader, Avatar, Row, Col, Card } from "antd"
import defaultAvatar from "../../default_user.png"
import MainMenu from "./MainMenu"
import MainFeed from "./Feed"
import QuickLinks from "./QuickLinks"
import Text from "antd/lib/typography/Text"
import Title from "antd/lib/typography/Title"
import MainStatistics from "./MainStatistics"
import Wallpaper from "../Wallpaper"
import MainTimeLine from "./MainTimeLine"
import UserStatistics from "./UserStatistics"
import AccountInfo from "./AccountInfo"
import IconWrapper from "../Icons/IconWrapper"

const Home = () => {
  const { session } = useSelector(({ session }) => ({ session }), shallowEqual)
  const { currentUser } = session
  return session.isLoggedIn ? (
    <>
      <PageHeader
        title={
          <>
            <IconWrapper className='fal fa-home' style={{ marginRight: 10 }} />
            Home
          </>
        }
        ghost={false}
        style={{
          marginBottom: 24,
          marginTop: -24,
          marginLeft: -24,
          marginRight: -24,
          paddingBottom: 0
        }}>
        <Card
          bordered={false}
          bodyStyle={{ padding: 0, margin: 0 }}
          style={{ width: "90%" }}>
          <Card.Meta
            avatar={
              <Avatar src={currentUser.avatarSrc || defaultAvatar} size={64} />
            }
            description={
              <div>
                <Text style={{ fontSize: 20 }}>
                  Hey,{" "}
                  <Title level={4} style={{ margin: 0, display: "inline" }}>
                    {currentUser.name}
                  </Title>
                </Text>
                <UserStatistics />
              </div>
            }
          />
        </Card>
      </PageHeader>
      <Row gutter={[16, 16]}>
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          <MainMenu />
          <MainFeed />
        </Col>
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <AccountInfo />
          <QuickLinks />
          <MainStatistics />
          <MainTimeLine />
        </Col>
      </Row>
    </>
  ) : (
    <Wallpaper />
  )
}

export default Home
