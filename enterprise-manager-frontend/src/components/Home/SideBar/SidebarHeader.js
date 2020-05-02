import React from "react";
import Avatar from "./Avatar";
import "./styles.css";
import { CSSTransition } from "react-transition-group";

const SidebarHeader = ({ currentUser, minimized }) => {
  return (
    <div
      className={`d-flex align-items-center w-100 text-nowrap flex-nowrap px-3 `}
      style={{ height: "60.59px" }}>
      <CSSTransition in={!minimized} timeout={40} classNames="sidebar-fade">
        <div
          className="row flex-nowrap w-100 no-gutters"
          style={{ height: "35px" }}>
          <div className="col-auto">
            <Avatar currentUser={currentUser} size="35" />
          </div>
          <CSSTransition in={!minimized} timeout={40} classNames="hide-text">
            <div className="col-auto">
              <span className="d-flex h-100 ml-2 align-items-center">
                {currentUser.name}
              </span>
            </div>
          </CSSTransition>
        </div>
      </CSSTransition>
    </div>
  );
};

export default SidebarHeader;
