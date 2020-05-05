import React from "react";

export const NoContent = React.memo(({ children }) => (
  <div className="alert alert-info shadow-sm">{children}</div>
));
