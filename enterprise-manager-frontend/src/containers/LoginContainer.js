import React from "react"
import LoginForm from "../components/LoginForm"
import { useEffect } from "react"
import { useSelector, useDispatch, shallowEqual } from "react-redux"
import { useHistory } from "react-router-dom"
import { addSession } from "../actions/sessionActions"
import { Row, Col, Layout } from "antd"
import Title from "antd/lib/typography/Title"
import Wallpaper from "../components/Wallpaper"

const LoginContainer = () => {
  const { session, organizations, roots } = useSelector(
    ({ session, organizations, roots }) => ({
      session,
      organizations,
      roots
    }),
    shallowEqual
  )
  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (session.isLoggedIn) history.push("/")
    else if (organizations.length === 0) history.push("/organizations/new")
    else if (roots.length === 0) history.push("/accounts/new")
  }, [session, roots, organizations, history])

  const handleOnSubmit = data => {
    dispatch(addSession(data)).then(acc =>
      acc.token ? history.push(`reset_password?token=${acc.token}`) : null
    )
  }

  return (
    <Layout
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0
      }}>
      <Wallpaper />
      <Row justify='center' align='middle' style={{ height: "100%" }}>
        <Col xl={7} lg={10} md={12} sm={18} xs={22}>
          <Title type={"primary"} level={3}>
            <i className='fal fa-sign-in-alt' style={{ marginRight: 5 }}></i>
            Login
          </Title>
          <LoginForm handleOnSubmit={handleOnSubmit} />
        </Col>
      </Row>
    </Layout>
  )
}

export default LoginContainer
