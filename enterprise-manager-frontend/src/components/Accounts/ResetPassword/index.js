import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { connect, useSelector, shallowEqual, useDispatch } from "react-redux"
import { verifyToken } from "../../../actions/activationActions"
import ResetForm from "./ResetForm"
import PasswordChange from "./PasswordChange"
import { Row, Col, Layout } from "antd"
import Wallpaper from "../../Wallpaper"
import RootActivation from "../Activation"
import { fetchSession } from "../../../actions/sessionActions"

const ResetPassword = ({ verifyToken }) => {
  const location = useLocation()
  const { session } = useSelector(({ session }) => ({ session }), shallowEqual)
  const params = new URLSearchParams(location.search)
  const tokenParam = params.get("token")
  const [validToken, setValidToken] = useState(false)
  const [token, setToken] = useState()
  const [isRoot, setIsRoot] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(session.isLoggedIn)

  const dispatch = useDispatch()

  useEffect(() => {
    if (tokenParam) {
      verifyToken(tokenParam).then(resp => {
        if (resp.message === "success") {
          setToken({ token: tokenParam, ...resp })
          setValidToken(true)
        } else {
          setToken()
          setValidToken(false)
        }
        setIsRoot(resp.root)
      })
    }
  }, [tokenParam, verifyToken])

  useEffect(() => {
    if (!isLoggedIn && session.isLoggedIn) {
      dispatch(fetchSession()).then(() => setIsLoggedIn(session.isLoggedIn))
    }
  }, [isLoggedIn, session, dispatch])

  if (isLoggedIn || session.isLoggedIn) return null

  return (
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
          {validToken ? (
            isRoot ? (
              <RootActivation token={token} />
            ) : (
              <PasswordChange token={token} />
            )
          ) : (
            <ResetForm />
          )}
        </Col>
      </Row>
    </Layout>
  )
}

export default connect(null, { verifyToken })(ResetPassword)
