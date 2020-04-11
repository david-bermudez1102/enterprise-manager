import React from "react";

export const FormCard = ({ header, children, footer }) => (
  <div className="card border-0 shadow-sm">
    <CardHeader>{header}</CardHeader>
    <CardBody>{children}</CardBody>
    {footer ? <CardFooter>{footer}</CardFooter> : null}
  </div>
);

export const CardHeader = ({ children }) => (
  <div className="card-header bg-secondary border-0 d-flex align-items-center justify-content-between">{children}</div>
);

export const CardBody = ({ className, children }) => <div className={`card-body ${className}`}>{children}</div>;
export const CardFooter = ({ children }) => <div className="card-footer">{children}</div>;
