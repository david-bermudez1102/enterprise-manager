import React from "react";
import { CSSTransition } from "react-transition-group";
import "./styles.css";
import SidebarHeader from "./SidebarHeader";
import SidebarLinks from "./SidebarLinks";
import ToggleButton from "./ToggleButton";
import useSidebar from "./useSidebar";

const SideBar = ({ session, organizations }) => {
  const {
    links,
    minimized,
    toggleDropDown,
    toggle,
    openSideBar,
    closeSideBar,
  } = useSidebar({ organization: organizations[0] });
  const appear = minimized;

  return (
    <CSSTransition in={!minimized} timeout={40} classNames="slider">
      <div
        className={`sidebar pt-0 bg-secondary shadow text-light vh-100 sticky-top ${
          appear ? "slider-appear-done" : "slider-enter-done"
        }`}
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
                appear={appear}
              />
              <hr
                className="my-0 w-100"
                style={{ background: "rgba(0,0,0,0.2)", marginLeft: "-1%" }}
              />
              <SidebarLinks
                links={links}
                minimized={minimized}
                toggleDropDown={toggleDropDown}
                appear={appear}
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

export default React.memo(SideBar);
