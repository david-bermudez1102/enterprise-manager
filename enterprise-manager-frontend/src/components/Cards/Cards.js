import React from "react";

export const FormCard = ({ header, children, footer }) => (
  <div className="card border-0 shadow-sm">
    <CardHeader>{header}</CardHeader>
    <CardBody>{children}</CardBody>
    {footer ? <CardFooter>{footer}</CardFooter> : null}
  </div>
);

export const CardHeader = ({ children }) => (
  <div className="card-header mb-0 bg-secondary border-0 d-flex align-items-center justify-content-between">
    <span className="card-title d-flex w-100 mb-0 text-white justify-content-between align-items-center">
      {children}
    </span>
  </div>
);

export const CardBody = ({ className, children }) => (
  <div className={`card-body ${className}`}>{children}</div>
);
export const CardFooter = ({ children }) => (
  <div className="card-footer">{children}</div>
);
