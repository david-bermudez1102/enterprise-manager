import React from "react";
import DropdownButton from "./DropdownButton";
import SidebarSubLinks from "./SidebarSubLinks";
import { NavLink } from "react-router-dom";
import "./styles.css";
import { CSSTransition } from "react-transition-group";

const SidebarLinks = ({ links, minimized, toggleDropDown, appear }) => {
  return (
    <div className="px-2 py-2">
      {links.map((link, id) => (
        <CSSTransition
          in={!minimized}
          timeout={40}
          classNames="sidebar-fade"
          key={`sidebar_link_${id}`}>
          <div className="p-0 m-0">
            <NavLink
              exact={link.exact}
              to={link.path}
              className={`${link.className} d-flex w-100 flex-nowrap mb-1 overflow-hidden justify-content-between text-nowrap align-items-center`}
              activeClassName="bg-info active shadow"
              style={{ height: "40px" }}>
              <span style={{ marginLeft: "1px" }}>
                <i className={link.icon}></i>
                <CSSTransition
                  in={!minimized}
                  timeout={40}
                  classNames="hide-text">
                  <span
                    className={
                      appear
                        ? `${link.textClass} hide-text-exit-done`
                        : link.textClass
                    }>
                    {link.text}
                  </span>
                </CSSTransition>
              </span>

              <DropdownButton
                link={link}
                minimized={minimized}
                toggleDropDown={toggleDropDown}
              />
            </NavLink>

            <SidebarSubLinks link={link} minimized={minimized} />
          </div>
        </CSSTransition>
      ))}
    </div>
  );
};

export default SidebarLinks;
