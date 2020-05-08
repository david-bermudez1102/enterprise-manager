import React from "react";

const InputGroup = ({ children }) => {
  return (
    <div className="form-group m-0 ml-n2 row no-gutters flex-nowrap p-0 w-100">
      <div className="col-auto my-auto h-100" style={{ zIndex: 2 }}>
        <button
          disabled
          className="btn h-100 text-secondary text-right border-0 mr-n4 pl-2 py-0"
          style={{ zIndex: 3 }}>
          {React.cloneElement(children[0], {
            className: `${children[0].props.className}`,
            style: { fontSize: "12px" },
          })}
        </button>
      </div>
      <div className="col col-sm-12">
        {React.cloneElement(children[1], {
          className: `${children[1].props.className} pl-3`,
        })}
      </div>
    </div>
  );
};

export default InputGroup;
