import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const useSidebarLinks = ({ organization }) => {
  const navLinkClass = "nav-item nav-link text-light pr-0";
  const location = useLocation();
  const activePath = location.pathname;
  const initalLinks = [
    {
      path: "/",
      exact: true,
      className: navLinkClass,
      text: "Home",
      icon: "fas fa-home",
      textClass: "ml-2",
      iconMin: "fas fa-home",
    },
    {
      path: "/organizations",
      className: navLinkClass,
      exact: true,
      text: "Organizations",
      icon: "fas fa-briefcase",
      iconMin: "fas fa-briefcase",
      textClass: "ml-2",
      levels: ["admin"],
    },
    {
      path: `/organizations/${organization.id}/records`,
      className: `${navLinkClass}`,
      text: "Records",
      icon: "fas fa-th-list",
      iconMin: "fas fa-th-list",
      textClass: "ml-2",
      dropdown: true,
      levels: ["admin", "manager", "employee"],
      subLinks: [
        {
          path: `records/deleted`,
          text: "Deleted",
          icon: "fas fa-folder-times",
          className: `${navLinkClass}`,
        },
        {
          path: "/accounts/add",
          text: "Archived",
          icon: "fas fa-archive",
          className: `${navLinkClass}`,
        },
      ],
    },
    {
      path: "/accounts",
      className: navLinkClass,
      text: "Accounts",
      icon: "fas fa-users-cog mr-n1",
      iconMin: "fas fa-users-cog",
      levels: ["admin"],
      textClass: "ml-2",
      dropdown: true,
      status: activePath.includes("/accounts") ? "open" : "closed",
      subLinks: [
        {
          path: "/accounts/add",
          text: "Add account",
          icon: "fas fa-user-plus",
          className: `${navLinkClass}`,
        },
      ],
    },
    {
      path: `/organizations/${organization.id}/resources`,
      dropdown: true,
      className: `${navLinkClass}`,
      text: "Resources",
      icon: "fas fa-layer-group",
      iconMin: "fas fa-layer-group",
      textClass: "ml-2",
      levels: ["admin", "manager", "employee"],
      subLinks: [
        {
          path: `/organizations/${organization.id}/resources/new`,
          text: "New Resource",
          icon: "fas fa-layer-plus",
          className: `${navLinkClass}`,
        },
      ],
    },
  ];
  const [minimized, setMinimized] = useState(false);
  const [minimizedFromToggle, setMinimizedFromToggle] = useState(false);
  const [links, setLinks] = useState(initalLinks);
  useEffect(() => {
    setLinks(
      links.map((link, id) => {
        return { ...link, id: id };
      })
    );
    // eslint-disable-next-line
  }, []);

  const toggleDropDown = (e, linkId) => {
    e.preventDefault();
    e.stopPropagation();
    setLinks(
      links.map(link =>
        link.dropdown
          ? link.id === linkId
            ? { ...link, status: link.status === "open" ? "closed" : "open" }
            : { ...link, status: "closed" }
          : { ...link }
      )
    );
  };

  const toggle = () => {
    setMinimized(minimized ? false : true);
    setMinimizedFromToggle(minimizedFromToggle ? false : true);
  };

  const openSideBar = () => {
    if (minimizedFromToggle) setMinimized(false);
  };

  const closeSideBar = () => {
    if (minimizedFromToggle) setMinimized(true);
  };

  return {
    links,
    minimized,
    minimizedFromToggle,
    toggleDropDown,
    toggle,
    openSideBar,
    closeSideBar,
  };
};

export default useSidebarLinks;
