import React from "react";
import { CSSTransition } from "react-transition-group";
import "./styles.css";
import useSidebarLinks from "./useSidebarLinks";
import SidebarHeader from "./SidebarHeader";
import SidebarLinks from "./SidebarLinks";
import ToggleButton from "./ToggleButton";

const SideBar = ({ session, organizations }) => {
  const {
    links,
    minimized,
    toggleDropDown,
    toggle,
    openSideBar,
    closeSideBar,
  } = useSidebarLinks({ organization: organizations[0] });

  return (
    <CSSTransition in={!minimized} timeout={40} classNames="slider" appear>
      <div
        className="sidebar pt-0 bg-secondary shadow text-light vh-100 sticky-top"
        style={{ fontSize: "16px" }}>
        <nav
          className="px-0 py-0 nav nav-dark nav-pills flex-column h-100 d-flex"
          style={{ zIndex: 999 }}>
          <div
            style={{ width: "101%" }}
            onMouseEnter={openSideBar}
            onMouseLeave={closeSideBar}>
            <div style={{ marginLeft: "-1%", position: "sticky" }}>
              <SidebarHeader
                currentUser={session.currentUser}
                minimized={minimized}
              />
              <hr
                className="my-0 w-100"
                style={{ background: "rgba(0,0,0,0.2)", marginLeft: "-1%" }}
              />
              <SidebarLinks
                links={links}
                minimized={minimized}
                toggleDropDown={toggleDropDown}
              />
            </div>
          </div>
          <div className="text-center w-100 justify-content-center flex-wrap mt-auto mb-0">
            <hr className="mb-0" style={{ marginLeft: "-1%" }} />
            <ToggleButton toggle={toggle} minimized={minimized} />
          </div>
        </nav>
      </div>
    </CSSTransition>
  );
};

export default SideBar;
