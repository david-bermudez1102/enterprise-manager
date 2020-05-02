import React from "react";
import { NavLink } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

const SidebarSubLinks = ({ link, minimized }) => {
  return link.dropdown && link.status === "open"
    ? link.subLinks.map((subLink, id) => (
        <CSSTransition
          in={!minimized}
          timeout={40}
          classNames="sidebar-fade"
          key={`sidebar_sublink_${id}`}>
          <NavLink
            to={subLink.path}
            className={`${subLink.className} w-100 mt-1 mb-2 text-nowrap`}
            style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
            activeClassName="bg-light text-dark active shadow">
            <i className={`fas fa-chevron-right ml-1`}></i>
            <CSSTransition in={!minimized} timeout={40} classNames="hide-text">
              <span className="ml-3 text-nowrap">
                <i className={`${subLink.icon} mr-2`}></i>
                {subLink.text}
              </span>
            </CSSTransition>
          </NavLink>
        </CSSTransition>
      ))
    : null;
};

export default SidebarSubLinks;
