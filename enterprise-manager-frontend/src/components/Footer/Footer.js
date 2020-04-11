import React from "react";

const Footer = ({ organization, session }) => (
  <footer className="page-footer bg-white w-100" style={{ borderTop: "1px solid #dee2e6" }}>
    <div className="footer-copyright py-3 w-100 text-secondary">
      <div className={session.isLoggedIn ? "container-fluid" : "container"}>{`${organization.name} © 2020`}</div>
    </div>
  </footer>
);

export default Footer;
