import React, { useState } from "react"
import { Drawer, Affix, Button } from "antd"
import { SettingOutlined } from "@ant-design/icons"
import { useDispatch } from "react-redux"

const HomeSettings = props => {
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  return (
    <>
      <Affix style={{ position: "fixed", zIndex: 2000, right: 0, top: 70 }}>
        <Button
          onClick={() => setVisible(!visible)}
          type='primary'
          size={"large"}
          style={{
            borderRadius: "4px 0 0 4px",
            display: "flex",
            alignItems: "center",
            width: "48px",
            height: "48px"
          }}>
          <SettingOutlined style={{ fontSize: "20px", margin: "auto" }} />
        </Button>
      </Affix>
      <Drawer visible={visible} zIndex={2001} onClose={() => setVisible(false)}>
        <img
          onClick={() => dispatch({ type: "SET-THEME", color: "dark" })}
          src='https://gw.alipayobjects.com/zos/antfincdn/hmKaLQvmY2/LCkqqYNmvBEbokSDscrm.svg'
          alt='realDark'
        />
        <Button onClick={() => dispatch({ type: "SET-THEME", color: "light" })}>
          Light
        </Button>
      </Drawer>
    </>
  )
}

export default HomeSettings
