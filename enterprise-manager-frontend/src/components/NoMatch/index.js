import React from "react"
import { Link } from "react-router-dom"
import { Result, Button, Layout } from "antd"

const NoMatch = () => {
  return (
    <Layout
      style={{
        position: "relative",
        zIndex: 2,
        width: "100%",
        height: "100%",
        top: 0,
        left: 0
      }}>
      <Result
        status='404'
        title='404'
        subTitle="We're sorry. It appears the page you were looking for doesn't exist or
          has been removed."
        extra={
          <Link to={"/"}>
            <Button type='primary'>Back Home</Button>
          </Link>
        }
      />
    </Layout>
  )
}

export default NoMatch
