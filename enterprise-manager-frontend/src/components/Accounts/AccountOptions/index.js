import React from "react";
import cuid from "cuid";
import { Link } from "react-router-dom";
import IconWrapper from "../../Icons/IconWrapper";
import ToggleContent from "../../ToggleContent";
import Modal from "../../Modal";

const AccountOptions = ({ account }) => {
  const menuIcons = [
    {
      title: "Resend Confirmation Email",
      className: "fas fa-envelope",
      action: "confirmation_email"
    },
    {
      title: account.disabled ? "Enable Account" : "Disable Account",
      className: "fas fa-power-off",
      action: "disable",
      modalTitle: account.disabled ? `Enable ${account.name}'s account?` : `Disable ${account.name}'s account?`,
      modalMessage: account.disabled
        ? "The account will gain access back."
        : "The account won't be able to access the platform and you'll be able to enable it anytime.",
      showModal: true
    },
    { title: "", className: "fas fa-unlock", action: "edit", showModal: true },
    { title: "Edit Account", className: "fas fa-pen", action: "edit" },
    {
      title: "Delete Account",
      className: "fas fa-user-times",
      modalTitle: `Delete ${account.name}'s account?`,
      modalMessage:
        "The account will be deleted from the database, however data like the name and records created will be kept. If you'd prefer to disable this account temporarily, use the disable option.",
      action: "delete",
      showModal: true
    }
  ];
  return (
    <span className={classNames.accountOptions} style={{ fontSize: "18px" }}>
      {menuIcons.map(icon =>
        !icon.showModal ? (
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
              <Modal title={icon.modalTitle} handleClose={hide} message={icon.modalMessage}>
                <Link to={`/accounts/${account.id}/${icon.action}`}>
                  <button type="button" className="btn btn-danger" onClick={e => e.stopPropagation()}>
                    {icon.title}
                  </button>
                </Link>
              </Modal>
            )}
          />
        )
      )}
    </span>
  );
};

const classNames = {
  accountOptions: "order-1 order-xl-2 col-xl-6 px-0 py-2 py-xl-0 d-flex justify-content-between text-primary"
};

export default AccountOptions;
