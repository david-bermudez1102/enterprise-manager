import React from "react";
import cuid from "cuid";
import { Link } from "react-router-dom";
import IconWrapper from "../../Icons/IconWrapper";
import ToggleContent from "../../ToggleContent";
import DeletionModal from "../../Modal/DeletionModal";
import { menuIcons } from "./menuIcons";
import Avatar from "../../Home/SideBar/Avatar";

const AccountOptions = ({ account }) => {
  return (
    <span className={classNames.accountOptions} style={{ fontSize: "18px" }}>
      {menuIcons(account).map(icon =>
        !icon.showModal ? (
          !icon.disabled ? (
            <Link
              to={`/accounts/${account.id}/${icon.action}`}
              className="text-light p-0 m-0 d-flex text-decoration-none"
              title={icon.title}
              key={cuid()}>
              <IconWrapper size="30px">
                <i className={icon.className}></i>
              </IconWrapper>
            </Link>
          ) : (
            <IconWrapper size="30px" key={cuid()}>
              <i className={icon.className} title={icon.title}></i>
            </IconWrapper>
          )
        ) : (
          <ToggleContent
            key={cuid()}
            toggle={show => (
              <a
                className="text-light p-0 m-0 d-flex text-decoration-none"
                href={`/accounts/${account.id}/${icon.action}`}
                onClick={e => e.preventDefault()}>
                <IconWrapper size="30px" title={icon.title} onClick={show}>
                  <i className={icon.className}></i>
                </IconWrapper>
              </a>
            )}
            content={hide => (
              <DeletionModal
                title={
                  <span className="d-flex align-items-center">
                    <Avatar
                      currentUser={account}
                      style={{ zIndex: 1 }}
                      size={40}
                    />
                    {icon.modalTitle}
                  </span>
                }
                handleClose={hide}
                message={icon.modalMessage}>
                <Link to={`/accounts/${account.id}/${icon.action}`}>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={e => e.stopPropagation()}>
                    {icon.title}
                  </button>
                </Link>
              </DeletionModal>
            )}
          />
        )
      )}
    </span>
  );
};

const classNames = {
  accountOptions:
    "order-1 order-xl-2 col-xl-6 px-0 py-2 py-xl-0 d-flex justify-content-between text-primary",
};

export default AccountOptions;
