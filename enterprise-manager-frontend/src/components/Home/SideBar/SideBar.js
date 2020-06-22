import React, { useState } from "react"
import SidebarLinks from "./SidebarLinks"
import { Layout } from "antd"
import useLinks from "../../../Router/Hooks/useLinks"

const { Sider } = Layout

const SideBar = ({ session, organizations, collapsed, handleCollapse }) => {
  const { links } = useLinks({
    organization: organizations[0],
    exclude: ["Notification", "Login", "Logout"]
  })

  const [broken, setBroken] = useState(false)

  return (
    <Sider
      onBreakpoint={setBroken}
      breakpoint={"md"}
      collapsible
      trigger={null}
      collapsed={collapsed}
      collapsedWidth={broken ? 0 : undefined}
      onCollapse={handleCollapse}
      className='shadow-sm'>
      <SidebarLinks links={links} session={session} collapsed={collapsed} />
    </Sider>
  )
}

export default React.memo(SideBar)
