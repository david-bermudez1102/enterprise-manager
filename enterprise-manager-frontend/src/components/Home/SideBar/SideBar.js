import React, { useState } from "react"
import SidebarLinks from "./SidebarLinks"
import useSidebar from "./useSidebar"
import { Layout } from "antd"

const { Sider } = Layout

const SideBar = ({ session, organizations, collapsed, handleCollapse }) => {
  const { links } = useSidebar({
    organization: organizations[0]
  })

  const [broken, setBroken] = useState(false)

  console.log(collapsed)
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
