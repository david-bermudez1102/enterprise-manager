import React from "react"
import { useDispatch, useSelector, shallowEqual } from "react-redux"
import { Redirect } from "react-router-dom"
import RootForm from "../../components/Accounts/RootForm"
import { addRoot } from "../../actions/rootActions"
import { Layout, Row, Col, Card } from "antd"
import Title from "antd/lib/typography/Title"
import Wallpaper from "../../components/Wallpaper"

const RootContainer = () => {
  const dispatch = useDispatch()
  const { organizations, roots } = useSelector(
    ({ organizations, roots }) => ({ organizations, roots }),
    shallowEqual
  )
  return (
    <>
      {organizations.length === 0 ? (
        <Redirect push to='/organizations/new' />
      ) : null}
      {roots.length === 0 ? (
        <Layout
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            zIndex: 0
          }}>
          <Wallpaper />
          <Row justify='center' align='middle' style={{ height: "100%" }}>
            <Col span={24} sm={20} md={18} lg={16} xl={8} xxl={7}>
              <Card
                bordered={false}
                style={{ background: "transparent" }}
                title={
                  <Title level={3} style={{ marginBottom: 0 }}>
                    <i className='fal fa-user-shield'></i> Create Root User
                  </Title>
                }>
                <RootForm
                  addRoot={root => dispatch(addRoot(root))}
                  organizationId={organizations[0].id}
                />
              </Card>
            </Col>
          </Row>
        </Layout>
      ) : (
        <Redirect push to='/login' />
      )}
    </>
  )
}

export default React.memo(RootContainer)
