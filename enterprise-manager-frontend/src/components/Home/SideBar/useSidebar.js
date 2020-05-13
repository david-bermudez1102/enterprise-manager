import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  HomeOutlined,
  ApartmentOutlined,
  TableOutlined,
  UserSwitchOutlined,
  UserAddOutlined,
  GroupOutlined,
  AppstoreAddOutlined,
  FlagOutlined,
  SwitcherOutlined,
} from "@ant-design/icons";

const useSidebar = ({ organization }) => {
  const location = useLocation();
  const activePath = location.pathname;
  const links = [
    {
      path: "/",
      exact: true,
      text: "Home",
      icon: <HomeOutlined />,
    },
    {
      path: "/organizations",
      exact: true,
      text: "Organizations",
      icon: <ApartmentOutlined />,
      levels: ["admin"],
    },
    {
      path: `/organizations/${organization.id}/records`,
      text: "Records",
      icon: <TableOutlined />,
      dropdown: true,
      levels: ["admin", "manager", "employee"],
      subLinks: [
        {
          path: `/organizations/${organization.id}/records/deleted`,
          text: "Deleted",
          icon: <SwitcherOutlined />,
        },
        {
          path: `/organizations/${organization.id}/archived/deleted`,
          text: "Archived",
          icon: <FlagOutlined />,
        },
      ],
    },
    {
      path: "/accounts",
      text: "Accounts",
      icon: <UserSwitchOutlined />,
      levels: ["admin"],
      dropdown: true,
      status: activePath.includes("/accounts") ? "open" : "closed",
      subLinks: [
        {
          path: "/accounts/add",
          text: "Add account",
          icon: <UserAddOutlined />,
        },
      ],
    },
    {
      path: `/organizations/${organization.id}/resources`,
      dropdown: true,
      text: "Resources",
      icon: <GroupOutlined />,
      levels: ["admin", "manager", "employee"],
      subLinks: [
        {
          path: `/organizations/${organization.id}/resources/new`,
          text: "New Resource",
          icon: <AppstoreAddOutlined />,
        },
      ],
    },
  ];

  const { sidebar } = useSelector(({ sidebar }) => ({ sidebar }), shallowEqual);
  const dispatch = useDispatch();
  return {
    links,
    dispatch,
    sidebar,
  };
};

export default useSidebar;
