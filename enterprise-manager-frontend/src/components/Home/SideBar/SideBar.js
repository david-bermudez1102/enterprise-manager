import React, { useState } from "react";
import SidebarLinks from "./SidebarLinks";
import useSidebar from "./useSidebar";
import { Layout } from "antd";

const { Sider } = Layout;

const SideBar = ({ session, organizations }) => {
  const { links, sidebar, dispatch } = useSidebar({
    organization: organizations[0],
  });

  const [collapsed, setCollapsed] = useState(sidebar.collapsed);

  const handleCollapse = collapsed => {
    setCollapsed(collapsed);
    dispatch({ type: "SET-COLLAPSED", collapsed });
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={handleCollapse}
      className="shadow-sm">
      <SidebarLinks links={links} session={session} collapsed={collapsed} />
    </Sider>
  );
};

export default React.memo(SideBar);
